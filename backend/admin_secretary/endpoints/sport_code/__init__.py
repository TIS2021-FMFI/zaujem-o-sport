from flasgger import SwaggerView
from verification.jwt import is_admin_or_secretary
from settings import DB

class SportCode(SwaggerView):

	@is_admin_or_secretary
	def get(self):
		return {"message": "ok", "newSportCode": DB.suggestNewSportCode()}
