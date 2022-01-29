from flask import request
from flasgger import SwaggerView
import csv_parsers.csvParser as parser
from verification.jwt import is_secretary


class Funding(SwaggerView):

	@is_secretary
	def post(self):
		if len(request.files) == 0:
			return {"message": "Missing uploaded file."}, 400


		file = request.files["csvFile"]
		if not file:
			return {"message": "Missing required parameter: `file`.", "data": {}}, 400

		correction = {7:{"sport_code":1, "branch_code":1, "sport_title":"AIKIDO","branch_title":"Aikido"}} # request.json.get("correction")
		#if not correction:
		#	return {"message": "Missing required parameter: `correction`.", "data": {}}, 400

		country_code = "SVK"  # request.json.get("correction")
		#if not country_code:
		#	return {"message": "Missing required parameter: `country_code`.", "data": {}}, 400

		currency = "euro"  # request.json.get("correction")
		# if not currency:
		#	return {"message": "Missing required parameter: `currency`.", "data": {}}, 400

		lines = []
		for line in file:
			lines.append(line.decode("utf-8").strip())

		p = parser.csvParser()
		suggestions = p.findFailures(lines, correction, country_code, currency)

		if len(suggestions) == 0:
			p.saveResults()
			return {"message": "ok"}

		else:
			return {"message": "fail", "suggestions": suggestions}
