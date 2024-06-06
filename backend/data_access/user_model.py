from flask import json
from data_access.db_access import db
import bson
from bson import json_util, ObjectId
import bcrypt

def register(user_info):
    query = {
        "username": user_info.username
    }

    user = db.user.find_one(query)

    if user:
        return {"message": "Existing user"}

    salt = bcrypt.gensalt()
    hashed = bcrypt.kdf(password = user_info.password.encode('utf8'), salt = salt, desired_key_bytes = 512, rounds = 100)

    user_data = {
        "username": user_info.username,
        "salt": salt,
        "hashed_password": hashed
    }
    db.user.insert_one(user_data)

    return {"username": user_info.username, "message": "Register success"}

def login(user_info):
    query = {
        "username": user_info.username
    }

    user = db.user.find_one(query)

    hashed_password = bcrypt.kdf(password = user_info.password.encode('utf8'), salt = user.get("salt"), desired_key_bytes = 512, rounds = 100)

    if (user.get("hashed_password") == hashed_password):
        return {"username": user.get("username"), "message": "Find user"}
    
    return {"message": "Find failed"}





