from flask import request
from flasgger import SwaggerView
from verification.jwt import is_admin
from openpyxl import load_workbook
from io import BytesIO
from csv_parsers.excelParser import excelParser
from settings import DB
import time

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

		if interconnectednessFile:
			wb = load_workbook(filename=BytesIO(interconnectednessFile.read()))
			type = 1 # TODO: prepojit cez API

			p = excelParser()
			parsed = p.parseInterconnectness(wb, type)

			print(len(parsed), "tu")

			if DB.deleteInterconnectednessTables(type) :
				print("deleted")
				start_time = time.time()
				for item in parsed:
					item.save()

				print("hotovo")
				print("--- %s seconds ---" % (time.time() - start_time))
			else:
				print("nepodarilo sa")


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