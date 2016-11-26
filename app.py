import os
from flask import Flask, request, send_from_directory
app = Flask(__name__, static_url_path='')

@app.route('/public/<path:path>')
def send_js(path):
    return send_from_directory('public', path)



if __name__ == '__main__':
  port = int(os.environ.get('PORT', 5000))
  app.run(host='0.0.0.0', port=port)