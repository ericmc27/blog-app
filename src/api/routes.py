from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import Users, db

api = Blueprint('api', __name__)


@api.route('/login', methods=['POST'])
def login():
  data = request.get_json()
  email, password = data['email'], data['password']
  userExists = Users.query.filter_by(email=email).first()

  if userExists and userExists.compare_password(password):
    token = create_access_token(identity=userExists.username)
    return jsonify({"login":"successful", "token":token, "fullName": userExists.full_name}), 200

  return jsonify({"login":"unsuccessful"}), 401

@api.route('/signup', methods=['POST'])
def signup():
  data = request.get_json()
  full_name, email, username, password = data['fullName'], data['email'], data['username'], data['password']
  userExists = Users.query.filter_by(email=email).first()

  if not userExists:
    new_user = Users(full_name=full_name, email=email, username=username, password=password)
    new_user.generate_password()
    db.session.add(new_user)
    db.session.commit()

  return '<h1>Hellooo</h1>'

@api.route('private', methods=['POST'])
@jwt_required()
def verify_jwt():
  return jsonify({"token":"valid"})

