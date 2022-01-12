from flasgger import SwaggerView
from verification.jwt import is_secretary
from settings import DB

class ShowCountriesView(SwaggerView):

	@is_secretary
	def get(self):

		res = { "message":"ok", "data": DB.getAllCountries()}
		return res