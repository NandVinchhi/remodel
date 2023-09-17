from twilio.rest import Client
import credentials

account_sid = credentials.account_sid
auth_token = credentials.auth_token
client = Client(account_sid, auth_token)

def sendSMS(text, phone):
    message = client.messages.create(from_ = '+18337831029', body = text, to=phone)
