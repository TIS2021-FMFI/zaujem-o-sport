from flasgger import SwaggerView
from verification.jwt import is_secretary
from flask import request
from settings import DB

class Sports(SwaggerView):

	@is_secretary
	def post(self):
		code = request.json.get("code")
		title = request.json.get("title")
		ok = DB.addSport(code, title)
		return {"message": "ok"} if ok else {"message": "Database error"}, 400
