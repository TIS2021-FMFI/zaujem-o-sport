from flasgger import SwaggerView
from verification.jwt import is_secretary
from settings import DB

class ShowSportsView(SwaggerView):

	@is_secretary
	def get(self):

		res = { "message":"ok", "data": DB.getAllSports()}
		return res

		# mock data
		"""return {"message": "ok", "data": {
			"sports": [
				{"title": "Football", "code": "1"},
				{"title": "Basketball", "code": "2"},
				{"title": "Baseball", "code": "3"}
			]
		}}"""