from flask import Blueprint

api = Blueprint('api', __name__)


@api.route('/login')
def hello():
  return '<h1>Hellooo</h1>'

