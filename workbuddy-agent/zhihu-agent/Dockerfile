FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    ZHIHU_CLOUD_DEPLOYMENT=1 \
    ZHIHU_SESSION_STORE=/data/zhihu-sessions \
    ZHIHU_CLASSROOM_STORE=/data/classroom

WORKDIR /app

COPY connector/server/pyproject.toml connector/server/uv.lock /app/connector/server/
RUN pip install --no-cache-dir "mcp[cli]>=2.0.0,<3"

COPY connector /app/connector

EXPOSE 8000

CMD ["python", "connector/server/server.py", "--transport", "streamable-http", "--host", "0.0.0.0", "--port", "8000"]
