from flask import request
from flasgger import SwaggerView
from verification.jwt import is_secretary

# TODO
class AddNewSportView(SwaggerView):

	@is_secretary()
	def post(self):
		if not request.json:
			return {"message": "Missing JSON body.", "data": {}}, 400

		sportCode = request.json.get("sport_code")
		sportName = request.json.get("sport_name")

		if not sportCode:
			return {"message": "Missing required parameter: `sport_code`.", "data": {}}, 400
		if not sportName:
			return {"message": "Missing required parameter: `sport_name`.", "data": {}}, 400

		return {"message": "ok", "data": {}}