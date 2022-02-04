from flask import request
from flasgger import SwaggerView
from verification.jwt import is_admin
from openpyxl import load_workbook
from io import BytesIO
from csv_parsers.excelParser import excelParser
from settings import DB
import json

class UploadView(SwaggerView):

	@is_admin
	def post(self):

		if len(request.files) == 0:
			return {"message": "Missing uploaded file."}, 400

		DB.createDatabaseBackup()

		fundingFile = request.files.get("fundingFile")
		successFile = request.files.get("successFile")
		interconnectednessFile = request.files.get("interconnectednessFile")

		requestJSON = json.loads(request.form["json"])
		countryCode = requestJSON.get("countryCode")
		currency = requestJSON.get("currency")
		interconnectednessType = requestJSON.get("interconnectednessType")

		print(countryCode, currency, interconnectednessType)

		# at least one must be uploaded e.g. fundingFile could have been uploaded, but successFile and
		# interconnectednessFile are going to be None.

		# TODO: handle file uploads



		if successFile:

			wb = load_workbook(filename=BytesIO(successFile.read()))
			p = excelParser()
			parsed = p.parseSuccess(wb)

			DB.deleteSuccesTables()

			for s in parsed[0]:
				s.save()

			for table in parsed[2:]:
				table.save()

			# TODO: list of unknown sports in parsed[1]

		return {}