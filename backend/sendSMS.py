import os
from twilio.rest import Client
import credentials

#Please convert to Env var before posting code, this is done rn for trial
account_sid = credentials.account_sid
auth_token = credentials.auth_token
client = Client(account_sid, auth_token)

def sendSMS(text):
    message = client.messages.create(from_ = '+18447290227', body = text, to='+15716212670')
    print(message.body)
    return None

#sendSMS("Trial Message")