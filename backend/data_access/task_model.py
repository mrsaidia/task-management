from flask import json
from data_access.db_access import db
import bson
from bson import json_util, ObjectId

def save_task(task, user):
    task_data = {
        "name": task.name,
        "description": task.description,
        "start_date": task.startDate,
        "due_date": task.dueDate,
        "status": task.status,
        "tag": task.tag,
        "username": user
    }
    db.task.insert_one(task_data)

def get_task_pagination(pagination, user):
    query = {
        "username": user
    }
    page = pagination['page']
    page_limit = pagination['limit']

    task_count = db.task.count_documents({})

    fetch_tasks = db.task.find(query).sort('_id', -1).skip(page_limit * (page - 1)).limit(page_limit)
    tasks_fetched = list(json.loads(json_util.dumps(fetch_tasks)))

    response = {
        'total_number': task_count, 'page': page, 'showing': page_limit, 'tasks': tasks_fetched
    }
    return response

def update_task(task):
    query = {
        "_id": ObjectId(task.id),
    }

    task_data = {
        "name": task.name,
        "description": task.description,
        "due_date": task.dueDate,
        "status": task.status,
    }

    update_data = {
        "$set": dict(task_data)
    }

    return db.task.update_one(query, update_data)

def delete_task(task):
    query={
        "_id": ObjectId(task.id)
    }

    return db.task.delete_one(query)


