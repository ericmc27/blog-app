from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from bcrypt import hashpw, checkpw, gensalt
from hashlib import sha256

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
    self.password = hashpw(self.password.encode("utf-8"), gensalt())

  def compare_password(self, password):
    return checkpw(password.encode("utf-8"), self.password)
  
  def hashed_user_id(self):
    secret_key = "&$/5||-2:lebronL=ebronLebronLebro$nLebron54"
    unique_identifier = f"{self.id}{secret_key}"
    return f"{sha256(unique_identifier.encode()).hexdigest()}", self.id
  
  
  def get_first_two_names(self):
    full_name = self.full_name.split(' ')
    if len(full_name) > 1:
      return f"{full_name[0]} {full_name[1]}"
    else:
      return f"{full_name}"
  
  
  def serialize(self):
    return {
      'fullName': self.full_name,
      'profilePicture': self.photo,
      'blogs': [blog.serialize() for blog in self.blogs]
    }


class Blogs(db.Model):
  __tablename__ = "blogs"
  
  id = db.Column(db.Integer, primary_key=True)
  author_id = db.Column(db.Integer, ForeignKey('users.id'))
  blog_title = db.Column(db.String(150), nullable=True)
  blog_body = db.Column(db.Text, nullable=True)
  created_at = db.Column(db.DateTime, default=datetime.today())
  
  author = relationship('Users', back_populates='blogs')
  
  def transform_date(self):
    return self.created_at.strftime('%m/%d/%Y')
  
  def hashed_blog_id(self):
    secret_key = "&$/5||-2:lebronL=ebronLebronLebro$nLebron54"
    unique_identifier = f"{self.id}{secret_key}"
    return f"{sha256(unique_identifier.encode()).hexdigest()}", self.id
  
  
  def serialize(self):
    return {
      'title':self.blog_title,
      'body':self.blog_body,
      'date':self.transform_date(),
      'id':self.hashed_blog_id()[0],
      'profilePicture': self.author.photo,
      'author': f"{self.author.get_first_two_names()}"
    }