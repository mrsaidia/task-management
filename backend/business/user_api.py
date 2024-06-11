from functools import wraps
from flask import jsonify
from flask_restful import Resource, reqparse
from data_access.user_model import change_password
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

class UserApi(Resource):
    decorators = [jwt_required()]
    def __init__(self):
        self.change_password_reqparse = reqparse.RequestParser()
        self.change_password_reqparse.add_argument('oldPassword')
        self.change_password_reqparse.add_argument('newPassword')

    def post(self):
        args = self.change_password_reqparse.parse_args()
        current_user = get_jwt_identity()
        args["username"] = current_user

        result = change_password(args)

        if not isinstance(result, dict)  and not result.matched_count:
            return {
                "message":"Failed to update. Record is not found"
            }, 404
        
        if not isinstance(result, dict) and not result.modified_count:
            return {
                "message":"No changes applied"
            }, 500
        
        if isinstance(result, dict) and result.get("message") == "Password is not correct":
            return {"message": result.get("message")}, 400
        
        return {"message":"Update success"}, 200