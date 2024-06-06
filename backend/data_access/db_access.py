
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from werkzeug.local import LocalProxy

def init_connection():
    uri = "mongodb+srv://dev_account:xxBJNDfAU2VJ6Db0@development.lajta5g.mongodb.net/?retryWrites=true&w=majority&appName=development"

    # Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))

    db = client.flask_database
    return db
    
db = LocalProxy(init_connection)

