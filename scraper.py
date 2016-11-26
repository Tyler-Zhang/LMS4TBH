import requests

    
class Scraper:
    def __init__(self, user_id, token):
        self.token = token
        self.user_id = user_id
    def getConversationId(self, target_id):
        request_url = "https://graph.facebook.com/v2.3/me/inbox?limit=50"
        count = 0
        while True:
            print request_url+"&access_token="+self.token
            entries = requests.get(request_url, headers={'Authorization': 'Bearer '+self.token}).json()
            if 'data' in entries:
                for conversation in entries['data']:
                    participants = conversation['to']['data']
                    if len(participants) == 2: #one on one convo
                        print participants
                        if participants[0]['id'] == str(target_id) or participants[1]['id'] == str(target_id):
                            return conversation['id']
                    
                count = count + 1
                if count > 5:
                    return -1
                if 'paging' in entries:
                    request_url = entries['paging']['next']
                else:
                    return -1
            else: 
                return -2

kevin = Scraper(100003263585357, "EAADLFchCYWMBAIB3bJMac41M8kyaAwdS255ubZAPX4ZCkh8EeZCGtZB7KD1q0DApH0ZAAE3yKe9OtVNKEZACo9ZARNFphnZBEQOdVIZCUOfKZBfJe6dj4Mt8xSsoF0rrLgcbugnVwQ9pzdikk62BChLULGmveSgMFdo0dGvJNz4co6IgZDZD")
print(kevin.getConversationId(1215022091))