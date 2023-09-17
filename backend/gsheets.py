import gspread
from google.oauth2 import service_account
import json

# Path to your OAuth 2.0 credentials JSON file
credentials_path = 'vthax-399221-92aa82bc7763.json'
scope = [
    'https://www.googleapis.com/auth/spreadsheets'
    ]

# Authenticate using the JSON credentials
#credentials = service_account.Credentials.from_service_account_file(credentials_path, ['https://www.googleapis.com/auth/spreadsheets'])

#creds = service_account.Credentials.from_service_account_file(credentials_path,scope)

service_account_info = json.load(open(credentials_path))
credentials = service_account.Credentials.from_service_account_info(
    service_account_info)

# Connect to the Google Sheets API
gc = gspread.authorize(credentials)

# Open the Google Sheets file by its URL
# Replace 'URL_OF_YOUR_PUBLIC_GOOGLE_SHEETS' with the actual URL
worksheet = gc.open_by_url('https://docs.google.com/spreadsheets/d/19Xe4nBDYk6cWYbXKiYqzNuhEPBJjRUngjazvjsefesQ/edit?usp=sharing').sheet1

# Modify the sheet as needed
worksheet.update('A1', 'New Data')  # Update cell A1 with 'New Data'