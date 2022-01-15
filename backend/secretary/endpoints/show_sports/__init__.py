from flasgger import SwaggerView
from verification.jwt import is_secretary
from settings import DB

class ShowSportsView(SwaggerView):

	@is_secretary
	def get(self):

		res = { "message":"ok", "data": DB.getBranchesWithSports()}
		return res

		# mock data
		"""
		return {"message": "ok", "data": {
			"columnNames": ["názov", "kód športu"],
			"sports": [
				["Football", 1],
				["Basketball", 2],
				["Baseball", 3],
				["Soccer", 4],
				["Golf", 5],
				["Running", 6],
				["Volleyball", 7]
			]
		}}
    """