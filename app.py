import os
from flask import Flask, send_from_directory, make_response, request, current_app
from flask_cors import CORS, cross_origin
import json
from app import responder

app = Flask(__name__, static_url_path='')
CORS(app)

@app.route('/public/<path:path>')
def send_js(path):
    return send_from_directory('public', path)

@app.route('/respond', methods=['POST'])
def respond():
    messages = json.loads(request.body.raw)['messages']
    text = ""
    for message in messages:
        text += message['message']
    response = responder.respond(text)
    print response
    return response



if __name__ == '__main__':
  port = int(os.environ.get('PORT', 5000))
  app.run(host='0.0.0.0', port=port)