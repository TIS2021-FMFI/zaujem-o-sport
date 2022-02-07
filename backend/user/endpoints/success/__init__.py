from flasgger import SwaggerView
from settings import DB

class ShowSuccessView(SwaggerView):

    def get(self, countryCode: str):
        res = {"message": "ok", "data": DB.getSuccessByCountry(countryCode)}
        return res
