
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from werkzeug.local import LocalProxy

def init_connection():

    # Create a new client and connect to the server
    client = MongoClient("localhost", port=27017)

    db = client.task_manager
    return db
    
db = LocalProxy(init_connection)

