from flasgger import SwaggerView
from verification.jwt import is_secretary

class ShowSportsView(SwaggerView):

	@is_secretary
	def get(self):
		# mock data
		return {"message": "ok", "data": {
			"sports": [
				{"title": "Football", "code": "1"},
				{"title": "Basketball", "code": "2"},
				{"title": "Baseball", "code": "3"}
			]
		}}