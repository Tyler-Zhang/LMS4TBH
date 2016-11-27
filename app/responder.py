import markovify

def respond(text):
    text_model = markovify.Text(text.lower())
    print(text.lower())
    msg = None
    try:
        msg = text_model.make_sentence_with_start("you")
    except: 
        False
    print(msg)
    if (msg == None):
        msg = text_model.make_sentence()
    if (msg != None):
        return "Tbh, " + msg 
    else: 
        return "Tbh, I have nothing interesting to say"
         