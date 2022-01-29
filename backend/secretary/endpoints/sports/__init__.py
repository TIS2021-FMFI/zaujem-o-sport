from flasgger import SwaggerView
from verification.jwt import is_secretary
from flask import request
from settings import DB

class Sports(SwaggerView):

	@is_secretary
	def get(self):
		return {"message": "ok", "sports": DB.getAllSports()}

	@is_secretary
	def post(self):
		code = request.json.get("code")
		title = request.json.get("title")
		ok = DB.addSport(code, title)
		if ok:
			return {"message": "ok"}
		return {"message": "Database error"}, 500
