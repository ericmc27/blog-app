from flask import Flask, send_from_directory, make_response
import os
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from api import api, db


app = Flask(__name__, static_folder=None)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'superman'


db.init_app(app)
Migrate(app, db)
JWTManager(app)
app.register_blueprint(api, url_prefix='/api')

@app.route('/static/<path:filename>')
def send_file(filename):
  response = make_response(send_from_directory(os.path.join(os.getcwd(), 'src', 'static'), filename))
  response.headers['Cache-Control'] = 'public, max-age=31536000'
  return response
