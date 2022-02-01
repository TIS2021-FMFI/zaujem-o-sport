from flasgger import SwaggerView
from verification.jwt import is_secretary
from settings import DB
from time import sleep

class ShowCountriesView(SwaggerView):

	@is_secretary
	def get(self):
		sleep(.75)
		return {"message": "ok", "countries": DB.getAllCountries()}
