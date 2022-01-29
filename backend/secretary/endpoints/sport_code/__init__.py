from flasgger import SwaggerView
from verification.jwt import is_secretary
from settings import DB

class SportCode(SwaggerView):

	@is_secretary
	def get(self):
		return {"message": "ok", "newSportCode": DB.suggestNewSportCode()}
