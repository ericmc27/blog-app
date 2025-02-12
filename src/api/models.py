from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
import bcrypt

db = SQLAlchemy()

class Users(db.Model):
  __tablename__ = "users"
  
  id = db.Column(db.Integer, primary_key=True)
  full_name = db.Column(db.String(50), nullable=False)
  username = db.Column(db.String(50), unique=True, nullable=False)
  email = db.Column(db.String(320), unique=True, nullable=False)
  password = db.Column(db.LargeBinary, nullable=False)
  photo = db.Column(db.String(255), unique=True, nullable=True)
  
  blogs = relationship('Blogs', back_populates='author')

  
  def hash_password(self):
    self.password = bcrypt.hashpw(self.password.encode("utf-8"), bcrypt.gensalt())

  def compare_password(self, password):
    return bcrypt.checkpw(password.encode("utf-8"), self.password)

  def serialize(self):
    return {
      'Full Name': self.full_name,
      'Username': self.username,
    }


class Blogs(db.Model):
  __tablename__ = "blogs"
  
  id = db.Column(db.Integer, primary_key=True)
  author_id = db.Column(db.Integer, ForeignKey('users.id'))
  blog_title = db.Column(db.String(150), nullable=True)
  blog_body = db.Column(db.Text, nullable=True)
  
  author = relationship('Users', back_populates='blogs')
  
  def serialize(self):
    return {
      'title':self.blog_title,
      'body':self.blog_body
    }