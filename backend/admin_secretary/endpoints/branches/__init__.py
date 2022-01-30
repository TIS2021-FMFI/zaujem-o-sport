from flasgger import SwaggerView
from verification.jwt import is_admin_or_secretary
from flask import request
from settings import DB

class Branches(SwaggerView):

	@is_admin_or_secretary
	def post(self):
		DB.addBranch(request.json)
		return {"message": "ok"}
