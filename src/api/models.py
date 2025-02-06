from flask_sqlalchemy import SQLAlchemy
import bcrypt

db = SQLAlchemy()

class Users(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  full_name = db.Column(db.String(50), nullable=False)
  username = db.Column(db.String(50), unique=True, nullable=False)
  email = db.Column(db.String(320), unique=True, nullable=False)
  password = db.Column(db.LargeBinary, nullable=False)

  def generate_password(self):
    self.password = bcrypt.hashpw(self.password.encode("utf-8"), bcrypt.gensalt())

  def compare_password(self, password):
    return bcrypt.checkpw(password.encode("utf-8"), self.password)

  def serialize(self):
    return {
      'Full Name': self.full_name,
      'Username': self.username,
    }
