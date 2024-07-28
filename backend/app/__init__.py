from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from .db import db



def create_app():
    app = Flask(__name__)
    #Initialize JWTManager
    jwt=JWTManager(app)



    #enables CORS request
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
    app.config.from_object('app.config.Config')
    db.init_app(app)


    from app.routes import bp as routes_bp
    app.register_blueprint(routes_bp)


    return app