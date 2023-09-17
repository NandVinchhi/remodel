import os
from supabase import create_client, Client
from credentials import SUPABASE_URL, SUPABASE_SERVICE_KEY

url: str = SUPABASE_URL
key: str = SUPABASE_SERVICE_KEY

supabase: Client = create_client(url, key)