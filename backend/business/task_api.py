from data_access.task_model import delete_task, save_task, get_task_pagination, update_task
from flask import jsonify
from flask_restful import Resource, Api,marshal_with, fields, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity

class TaskApi(Resource):
    decorators = [jwt_required()]
    def __init__(self):
        self.create_reqparse = reqparse.RequestParser()
        self.create_reqparse.add_argument('name')
        self.create_reqparse.add_argument('status', type = int)
        self.create_reqparse.add_argument('description')
        self.create_reqparse.add_argument('startDate', type = int)
        self.create_reqparse.add_argument('dueDate', type = int)
        self.create_reqparse.add_argument('tag')

        self.get_reqparse = reqparse.RequestParser()
        self.get_reqparse.add_argument('page', type = int, location='args')
        self.get_reqparse.add_argument('limit', type = int, location='args')

        self.patch_reqparse = reqparse.RequestParser()
        self.patch_reqparse.add_argument('id')
        self.patch_reqparse.add_argument('name')
        self.patch_reqparse.add_argument('status', type = int)
        self.patch_reqparse.add_argument('description')
        self.patch_reqparse.add_argument('dueDate', type = int)

        self.delete_reqparse = reqparse.RequestParser()
        self.delete_reqparse.add_argument('id', location='args')

    def get(self):
        data = self.get_reqparse.parse_args()
        current_user = get_jwt_identity()

        return jsonify (get_task_pagination(data, current_user))

    def post(self):
        args = self.create_reqparse.parse_args()
        current_user = get_jwt_identity()

        save_task(args, current_user)
        return jsonify (args)

    def patch(self):
        args = self.patch_reqparse.parse_args()

        result = update_task(args)

        if not result.matched_count:
            return {
                "message":"Failed to update. Record is not found"
            }, 404
        
        if not result.modified_count:
            return {
                "message":"No changes applied"
            }, 500
        
        return {"message":"Update success"}, 200
    
    def delete(self):
        args = self.delete_reqparse.parse_args()

        result = delete_task(args)

        if not result.deleted_count:
            return {
                "message":"Failed to delete"
            }, 500
        
        return {"message":"Delete success"}, 200