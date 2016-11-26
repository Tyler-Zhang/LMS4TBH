import os
from app import app
import markovify
from flask import request

@app.route('/index', methods =['GET', 'POST'])
def index():
    text = request.args.get('text')
    text_model = markovify.Text(text)
    msg = text_model.make_sentence_with_start("I")
    if (msg == None):
        msg = text_model.make_sentence()
    if (msg != None):
        return "<p>Tbh, " + msg + "</p>"
    else:
        return "<p>Tbh, I have nothing interesting to say</p>"
        
        
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)