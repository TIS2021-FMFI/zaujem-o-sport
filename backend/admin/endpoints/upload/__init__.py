from flask import request
from flasgger import SwaggerView
from openpyxl import load_workbook
from io import BytesIO
from csv_parsers.excelParser import excelParser
from settings import DB
from verification.jwt import is_secretary, is_admin


class UploadView(SwaggerView):

	@is_secretary
	def post(self):

		print("kuk")

		if len(request.files) == 0:
			return {"message": "Missing uploaded file."}, 400

		fundingFile = request.files.get("fundingFile")
		successFile = request.files.get("successFile")
		interconnectednessFile = request.files.get("interconnectednessFile")

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