from flask import Flask, render_template, url_for, redirect
from presentation.config_routes import configure_routes
from flask_cors import CORS
from flask_jwt_extended import JWTManager

def init_app():
    app = Flask(__name__)
    # Setup JWT
    app.config["JWT_SECRET_KEY"] = "super-secret"
    jwt = JWTManager(app)
    # Setup CORS
    CORS(app)

    configure_routes(app)

    return app

