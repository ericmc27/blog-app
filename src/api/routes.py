from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import Users, db
from werkzeug.utils import secure_filename
import os
import uuid
import magic

api = Blueprint('api', __name__)

@api.route('/login', methods=['POST'])
def login():
  data = request.get_json()
  email, password = data['email'], data['password']
  userExists = Users.query.filter_by(email=email).first()

  if userExists and userExists.compare_password(password):
    token = create_access_token(identity=userExists.username)
    return jsonify({'login':'successful', 'token':token, 'profilePicturePath':userExists.photo}), 200

  return jsonify({'login':'unsuccessful'}), 401

@api.route('/signup', methods=['POST'])
def signup():
  data = request.get_json()
  full_name, email, username, password = data['fullName'], data['email'], data['username'], data['password']
  userExists = Users.query.filter_by(email=email).first()

  if not userExists:
    new_user = Users(full_name=full_name, email=email, username=username, password=password)
    new_user.hash_password()
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'signup':'successful'}), 200

  return jsonify({'signup':'unsuccessful'}), 409

ALLOWED_MIME_TYPES = {'image/jpeg', 'image/jpg', 'image/png'}

@api.route('upload-profile-picture', methods=['POST'])
@jwt_required()
def upload():
  try:
    profile_picture = request.files['file']

    if profile_picture:
      mime = magic.Magic(mime=True)
      mimetype = mime.from_buffer(profile_picture.read(1024))
      
      if mimetype in ALLOWED_MIME_TYPES:
        profile_picture.seek(0)
        filename = secure_filename(profile_picture.filename)
        filename = os.path.splitext(filename)[0] + "-" + str(uuid.uuid4()) + os.path.splitext(filename)[1]
        storage_path = os.path.join(os.getcwd(), 'src', 'static', filename) #Double check when deploying
        profile_picture.save(storage_path)
        username = get_jwt_identity()
        current_user = Users.query.filter_by(username=username).first()
        current_user.photo = filename
        db.session.commit()
        
        return jsonify({'profilePicturePath':filename}), 200
      else:
        return jsonify({'message':'Invalid image type'}), 400
      
    else:
      return jsonify({'message':'No file uploaded'}), 400
        
  except Exception as e:
    return jsonify({'message':'Error'}), 500 #For now, I am checking for KeyError exception
  


@api.route('private', methods=['POST'])
@jwt_required()
def verify_jwt():
  return jsonify({'token':'valid'})

