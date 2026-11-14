param([int]$Port = 8788, [switch]$NoBrowser)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$baseUrl = "http://127.0.0.1:$Port"
if ($Port -lt 1024 -or $Port -gt 65535) { throw 'Invalid port.' }
$ready = $false
try {
    $catalog = Invoke-RestMethod "$baseUrl/api/textbooks" -TimeoutSec 2
    $ready = $catalog.status -eq 'ok' -and $catalog.book_count -eq 30
} catch { }
if (!$ready) {
    $listener = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
    if ($listener) { throw "Port $Port is in use. Run scripts/start_local.ps1 -Port $($Port + 1) to choose another port." }
    $runtime = Get-Command python -ErrorAction SilentlyContinue
    $bundled = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe'
    if (Test-Path -LiteralPath $bundled) { $pythonPath = $bundled }
    elseif ($runtime) { $pythonPath = $runtime.Source }
    else { throw 'Python 3.11 or newer is required.' }
    $logFolder = Join-Path $projectRoot 'output/local-runtime'
    New-Item -ItemType Directory -Force -Path $logFolder | Out-Null
    $entry = Join-Path $projectRoot 'run_local.py'
    $serverProcess = Start-Process -FilePath $pythonPath -ArgumentList @('-X','utf8','-u',('"' + $entry + '"'),'--port',"$Port") -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $logFolder "local-$Port.log") -RedirectStandardError (Join-Path $logFolder "local-$Port.error.log")
    for ($attempt = 0; $attempt -lt 25; $attempt++) {
        try {
            $catalog = Invoke-RestMethod "$baseUrl/api/textbooks" -TimeoutSec 2
            if ($catalog.status -eq 'ok' -and $catalog.book_count -eq 30) { $ready = $true; break }
        } catch { }
        if ($serverProcess.HasExited) { break }
        Start-Sleep -Milliseconds 200
    }
}
if (!$ready) { throw 'The textbook library did not start. See output/local-runtime for details.' }
if (!$NoBrowser) { Start-Process "$baseUrl/#textbooks" }
Write-Output "Textbooks ready: $baseUrl/#textbooks"
