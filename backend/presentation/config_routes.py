from flask import flash, render_template, redirect, url_for, request, jsonify
from flask_login import login_user, logout_user, login_required
from business import auth, task_api
from business.task_api import CalendarApi, TaskApi
from business.auth import LoginUserApi, RegisterUserApi
from flask_restful import Api
from business.user_api import UserApi

def configure_routes(app):
    api = Api(app)

    api.add_resource(TaskApi, '/task')
    api.add_resource(LoginUserApi, '/login')
    api.add_resource(RegisterUserApi, '/register')
    api.add_resource(UserApi, '/change_password')
    api.add_resource(CalendarApi, '/calendar')
