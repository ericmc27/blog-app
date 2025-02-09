from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from api import api, db


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'superman'


db.init_app(app)
Migrate(app, db)
JWTManager(app)
app.register_blueprint(api, url_prefix='/api')
