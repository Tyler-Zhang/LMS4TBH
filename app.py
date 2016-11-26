import os
import pyrebase
from flask import Flask, send_from_directory, make_response, request, current_app
from flask_cors import CORS, cross_origin
from app import responder
import string

printable = set(string.printable)

config = {
    "apiKey": "AIzaSyCtNC-Rh8J2LGQKP_Lx6VvxrBIYCffeX2Q",
    "authDomain": "lms4tbh-f4442.firebaseapp.com",
    "databaseURL": "https://lms4tbh-f4442.firebaseio.com",
    "storageBucket": "lms4tbh-f4442.appspot.com",
    "messagingSenderId": "468762791617"}
firebase = pyrebase.initialize_app(config)
db = firebase.database()


app = Flask(__name__, static_url_path='')
CORS(app)

@app.route('/public/<path:path>')
def send_js(path):
    return send_from_directory('public', path)

@app.route('/respond', methods=['POST'])
def respond():
    data = request.get_json()
    messages = data['messages']
    fromUser = data['from']
    toUser = data['to']
    text = ""
    for message in messages:
        text += message['message'] + ". "
    text = filter(lambda x: x in printable, text)
    print text
    response = responder.respond(text)

    fromUserObject = db.child(fromUser)
    print index.update({"index": fromUserObject.child('index').get().val() + 1})

    return response


        



if __name__ == '__main__':
  port = int(os.environ.get('PORT', 5000))
  app.run(host='0.0.0.0', port=port)