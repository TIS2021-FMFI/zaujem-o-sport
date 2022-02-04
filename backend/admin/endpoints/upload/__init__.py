from flask import request
from flasgger import SwaggerView
from verification.jwt import is_admin
from openpyxl import load_workbook
from io import BytesIO
from csv_parsers.excelParser import excelParser
from settings import DB


class UploadView(SwaggerView):

	@is_admin
	def post(self):

		if len(request.files) == 0:
			return {"message": "Missing uploaded file."}, 400

		fundingFile = request.files.get("fundingFile")
		successFile = request.files.get("successFile")
		interconnectednessFile = request.files.get("interconnectednessFile")

		# at least one must be uploaded e.g. fundingFile could have been uploaded, but successFile and
		# interconnectednessFile are going to be None.

		# TODO: handle file uploads

		p = excelParser()

		if interconnectednessFile:
			wb = load_workbook(filename=BytesIO(interconnectednessFile.read()))
			type = 1 # TODO: prepojit cez API

			parsed = p.parseInterconnectness(wb, type)

			if DB.deleteInterconnectednessTables(type):
				for item in parsed:
					item.save()
			else:
				pass #TODO raise error alebo nieco ???


		if successFile:

			wb = load_workbook(filename=BytesIO(successFile.read()))

			parsed = p.parseSuccess(wb)

			if DB.deleteSuccesTables():

				for item in parsed[0]:
					item.save()

				for table in parsed[2:]:
					table.save()

			# TODO: list of unknown sports in parsed[1]

		BGSfile = load_workbook(filename='BGS_test.xlsx')

		if BGSfile:
			wb = BGSfile
			# wb = load_workbook(filename=BytesIO(BGSfile.read()))

			parsed = p.parseBGS(wb)

			if DB.deleteBGS():

				for item in parsed:
					item.save()


		return {}