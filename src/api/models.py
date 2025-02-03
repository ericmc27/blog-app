from flask_sqlalchemy import SQLAlchemy 

db = SQLAlchemy()

class Users(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  full_name = db.Column(db.String(50), nullable=False)
  username = db.Column(db.String(50), unique=True, nullable=False)
  email = db.Column(db.String(320), unique=True, nullable=False)
  password = db.Column(db.String(255), nullable=False)
