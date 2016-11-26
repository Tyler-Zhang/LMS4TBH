import requests

    
class Scraper:
    def __init__(self, token):
        self.token = token;
    def scrapeInbox(self, user_id):
