import markovify

def respond(text):
    text_model = markovify.Text(text)
    try:
        msg = text_model.make_sentence(_with_start("I"))
        if (msg == None):
            msg = text_model.make_sentence()
        if (msg != None):
            return "Tbh, " + msg 
    except: 
        False
    return "Tbh, I have nothing interesting to say"
        