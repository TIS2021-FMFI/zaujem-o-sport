from flasgger import SwaggerView
from verification.jwt import is_secretary
from settings import DB


class ShowCountriesView(SwaggerView):

    def get(self):
        res = {"message": "ok", "countries": DB.getAllCountries()}
        return res
