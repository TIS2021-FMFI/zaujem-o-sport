from flasgger import SwaggerView
from verification.jwt import is_secretary

class ShowSportsView(SwaggerView):

	@is_secretary
	def get(self):
		# mock data
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