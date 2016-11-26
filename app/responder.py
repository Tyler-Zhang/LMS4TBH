import markovify

def respond(text):
    text_model = markovify.Text(text)
    #try:
     #   msg = text_model.make_sentence_with_start("I")
    #except: 
    #    False
    msg = None
    if (msg == None):
        msg = text_model.make_sentence()
    if (msg != None):
        return "Tbh, " + msg 
    else: 
        return "Tbh, I have nothing interesting to say"
        