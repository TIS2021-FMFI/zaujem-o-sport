from flasgger import SwaggerView
from verification.jwt import is_admin
from flask import request
from settings import DB

class Countries(SwaggerView):

	@is_admin
	def post(self):
		ok = DB.addCountry(request.json)
		if ok:
			return {"message": "ok"}
		return {"message": "Database error"}, 500