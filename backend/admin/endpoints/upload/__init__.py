from flask import request
from flasgger import SwaggerView
from verification.jwt import is_admin

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

		return {}