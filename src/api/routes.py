from flask import Blueprint, request, jsonify
from flask_socketio import SocketIO
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from .models import Users, Blogs, db
from werkzeug.utils import secure_filename
import redis
import os
import uuid
import magic



api = Blueprint('api', __name__)
r = redis.Redis(host='127.0.0.1', port=6379, decode_responses=True)
socketio = SocketIO()

@api.route('/login', methods=['POST'])
def login():
  data = request.get_json()
  email, password = data['email'], data['password']
  userExists = Users.query.filter_by(email=email).first()

  if userExists and userExists.compare_password(password):
    claims = {'id':userExists.id}
    token = create_access_token(identity=userExists.username, additional_claims=claims)
    return jsonify({'token':token, 'id':userExists.hashed_user_id()[0], 'profilePicturePath':userExists.photo, 'fullName':userExists.full_name}), 200

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
    hash, user_id = new_user.hashed_user_id()
    r.set(hash, user_id)
    return jsonify({'signup':'successful'}), 200

  return jsonify({'signup':'unsuccessful'}), 409

ALLOWED_MIME_TYPES = {'image/jpeg', 'image/jpg', 'image/png'}

@api.route('upload-profile-picture', methods=['POST'])
@jwt_required()
def upload():
  try:
    profile_picture = request.files['file']
    id = request.form.get('id')
  

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
        
        socketio.emit("userProfilePictureUpdate", {'id':id, 'newProfilePicturePath':filename})
        return jsonify({'profilePicturePath':filename}), 200
      else:
        return jsonify({'message':'Invalid image type'}), 400
      
    else:
      return jsonify({'message':'No file uploaded'}), 400
        
  except Exception as e:
    return jsonify({'message':'Error'}), 500 #For now, I am checking for KeyError exception
  


@api.route('submit-blog', methods=['POST'])
@jwt_required()
def submit_blog():
  data = request.get_json()
  new_blog = Blogs(author_id=get_jwt()['id'], blog_title=data['title'], blog_body=data['body'])
  db.session.add(new_blog)
  db.session.commit()
  hash, blog_id = new_blog.hashed_blog_id()
  r.set(hash, blog_id)

  return jsonify(new_blog.serialize())

@api.route('get-all-blogs', methods=['GET'])
@jwt_required()
def get_all_blogs():
  blogs = Blogs.query.all()
  blogs_list = [blog.serialize() for blog in blogs]

  return blogs_list

@api.route('get-single-blog/<string:id>', methods=['GET'])
def get_single_blog(id):
  current_blog_id = int(r.get(id))
  blog = Blogs.query.filter_by(id=current_blog_id).first().serialize()

  return blog

@api.route('get-user-data/<string:id>', methods=['GET'])
@jwt_required()
def get_user_data(id):
  id = r.get(id)
  current_user = Users.query.filter_by(id=id).first().serialize()
  
  return jsonify(current_user)

@api.route('private', methods=['POST'])
@jwt_required()
def verify_jwt():
  return jsonify({'token':'valid'})

