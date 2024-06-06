from functools import wraps
from flask import jsonify
from flask_restful import Resource, reqparse
from flask_login import login_user, logout_user, login_required
from data_access.user_model import register, login
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

class RegisterUserApi(Resource):
    def __init__(self):
        self.register_reqparse = reqparse.RequestParser()
        self.register_reqparse.add_argument('username')
        self.register_reqparse.add_argument('password')

    def post(self):
        args = self.register_reqparse.parse_args()
        result = register(args)

        if result.get("message") == "Existing user":
            return {"message": result.get("message")}, 400
        
        token = create_access_token(identity = result.get("username"))

        return {"token": token, "message": "Register success"}, 200

class LoginUserApi(Resource):
    def __init__(self):
        self.login_reqparse = reqparse.RequestParser()
        self.login_reqparse.add_argument('username')
        self.login_reqparse.add_argument('password')

    def post(self):
        args = self.login_reqparse.parse_args()
        result = login(args)

        if result.get("message")  == "Find failed":
            return {"message": result.get("message")}, 400
        
        token = create_access_token(identity = result.get("username"))

        return {"token": token, "message": "Register success"}, 200