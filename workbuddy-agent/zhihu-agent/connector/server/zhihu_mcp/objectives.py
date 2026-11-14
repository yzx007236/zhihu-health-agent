"""Versioned, teacher-review teaching objectives; never a grading rubric."""
from __future__ import annotations

import hashlib
import json
from functools import lru_cache
from pathlib import Path

RESOURCE = Path(__file__).with_name('clinical_question_objectives.json')


def stem_hash(stem: str) -> str:
    return hashlib.sha256(str(stem).encode('utf-8')).hexdigest()


def signature():
    try:
        stat = RESOURCE.stat()
        return str(RESOURCE), stat.st_mtime_ns, stat.st_size
    except OSError:
        return str(RESOURCE), 0, 0


@lru_cache(maxsize=2)
def _load(signature):
    try:
        data = json.loads(Path(signature[0]).read_text(encoding='utf-8'))
        if data['schema_version'] != '1.0' or not isinstance(data['objectives'], dict):
            raise ValueError('invalid schema')
        for qid, row in data['objectives'].items():
            if row['question_id'] != qid or not all(isinstance(row[k], str) and row[k].strip()
                    for k in ('exam_point', 'training_task', 'stem_hash', 'review_status')):
                raise ValueError('invalid objective')
            if not isinstance(row['case_ids'], list) or not row['case_ids'] or not all(isinstance(cid, str) for cid in row['case_ids']):
                raise ValueError('invalid case binding')
        return data['objectives'], 'ready'
    except (OSError, ValueError, KeyError, TypeError, AttributeError):
        return {}, 'unavailable'


def lookup(question):
    rows, status = _load(signature())
    row = rows.get(question.get('question_id'))
    if not row:
        return None, status if status != 'ready' else 'missing'
    if not question.get('stem') or stem_hash(question['stem']) != row['stem_hash']:
        return None, 'stale'
    return row, 'ready'


def public_objective(row):
    return {key: row[key] for key in ('question_id', 'exam_point', 'training_task', 'review_status')}
