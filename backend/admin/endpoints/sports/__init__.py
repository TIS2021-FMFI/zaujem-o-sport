from flasgger import SwaggerView
from verification.jwt import is_admin
from flask import request
from settings import DB

class Sports(SwaggerView):

	@is_admin
	def put(self):
		ok = DB.updateSport(request.json)
		if ok:
			return {"message": "ok"}
		return {"message": "Database error"}, 500
