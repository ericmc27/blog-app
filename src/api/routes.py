from flask import Blueprint, make_response

api = Blueprint('api', __name__)


@api.route('/login')
def login():
  response_object = make_response()
  print(response_object)
  return '<h1>Hellooo</h1>'

