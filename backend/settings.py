"""
Setup of the backend.
Plenty of things here can throw exception and that's good, since settings are called on the start of the backend app
and it's necessary to have everything up and running.
"""

from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import os
from os import environ as env
from datetime import timedelta
import psycopg2
from psycopg2 import pool
from db import Database

PRODUCTION_IP = ""  # TODO (production): this will become https domain
DEVELOPMENT_IP = "localhost"
PORT = 3001

""" Flask webserver setup. """
app = Flask(__name__)
app.secret_key = os.urandom(12)

""" Allowing Cross-Origin Resource Sharing. """
CORS(app)  # TODO (production): allow only specific domains

""" JWT tokens setup. """
app.config["JWT_SECRET_KEY"] = "development secret key"  # TODO (production): exchange for something else
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24)
jwt = JWTManager(app)

""" Database connection pool setup. """
dbPool = psycopg2.pool.ThreadedConnectionPool(
	minconn=1,
	maxconn=100,
	host=       env.get("DB_HOST"),
	database=   env.get("DB_NAME"),
	user=       env.get("DB_USER"),
	password=   env.get("DB_PASS")
)
DB = Database(dbPool)

#print(DB.getBranchesWithSports())
#print(DB.getSuccessByCountry("SVK"))
#print(DB.getFundingData("SVK"))
#print(DB.getSuccessBySport(28))
#print(DB.getSuccessByCountry("SVK"))
#print(DB.getInterconnectnessData(1, "SVK"))
#print("res", DB.getBGS())
#print("res", DB.getPoints())
#print(DB.getMaxPoints())
#print(DB.getNumCountriesInSport())
#print(DB.getTotalCountryPoints())
#print(DB.getMinOrder())
#print(DB.getEconIntercon())
#print(DB.getNonEconIntercon())
#print(DB.getNonCombiBranchFunding())
#print(DB.getActiveCountryIds())
#print(DB.getSportIds())
#DB.addSport({"code":204, "title":"WHATEVER5"})
#DB.updateSport({"old_code":202, "new_coprintde":210,"new_title":"UPDATED 2"})
#print(DB.updateSport({"old_code":210,"new_code":211,"new_title":"UPDATED 3"}))
#print(DB.addBranch({"sport_code": 3, "branch_code": 7, "branch_title": "TMP 1"}))
#print(DB.addCountry({"code":"SVK", "name": "haha", "translation":"hahaha"}))
#print(DB.addCountry({"code":"AFG", "name": "haha", "translation":"hahaha"}))
#print(DB.getCombiFunding())
#print(DB.getNonCombiBranchIds())
#print(DB.getNonCombiWithSportBranchIds())
#print(DB.getAllSportInfo())