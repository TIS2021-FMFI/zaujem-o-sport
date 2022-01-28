from flask import request
from flasgger import SwaggerView
from verification.jwt import is_secretary

class Funding(SwaggerView):

	@is_secretary
	def post(self):
		if len(request.files) == 0:
			return {"message": "Missing uploaded file."}, 400

		file = request.files["csvFile"]
		requestJSON = request.form["json"]
		countryCode, currency = requestJSON["countryCode"], requestJSON["currency"]

		# TODO: file validation, read content, etc.

		return {}