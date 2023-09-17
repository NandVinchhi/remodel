import os
from twilio.rest import Client
import credentials

#Please convert to Env var before posting code, this is done rn for trial
account_sid = credentials.account_sid
auth_token = credentials.auth_token
client = Client(account_sid, auth_token)

def sendSMS(text, phone):
    message = client.messages.create(from_ = '+18337831029', body = text, to=phone)
    print(message.body)
    return None

sendSMS("Trial message", "+12406969678")