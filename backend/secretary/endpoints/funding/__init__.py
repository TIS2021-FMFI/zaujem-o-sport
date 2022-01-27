from flask import request
from flasgger import SwaggerView
from verification.jwt import is_secretary
from csv_parsers import csvParser

class Funding(SwaggerView):

	@is_secretary
	def post(self):
		if len(request.files) == 0:
			return {"message": "Missing uploaded file."}, 400

		file = request.files["csvFile"]
		if not file:
			return {"message": "Missing required parameter: `file`.", "data": {}}, 400

		correction = request.json.get("correction")
		if not correction:
			return {"message": "Missing required parameter: `correction`.", "data": {}}, 400

		lines = []
		for line in file:
			lines.append(line)

		p = csvParser()
		suggestions = p.findFailures(lines, correction)

		if len(suggestions) == 0:
			p.saveResult()
			return {"message": "ok"}

		else:
			return {"message": "fail", "suggestions": suggestions}
