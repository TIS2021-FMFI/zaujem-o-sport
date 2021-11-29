from flask import Flask
import os

PRODUCTION_IP = ""  # TODO: TBD
DEVELOPMENT_IP = "localhost"
PORT = 3001

app = Flask(__name__)
app.secret_key = os.urandom(12)