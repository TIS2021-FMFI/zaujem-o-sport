from flasgger import SwaggerView
from settings import DB

class CountriesView(SwaggerView):

	def get(self):
		res = {"message": "ok", "countries": DB.getAllCountries()}
		return res
