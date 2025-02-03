from flask import Flask
from api import api, db


app = Flask(__name__)
app.register_blueprint(api, url_prefix='/api')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

