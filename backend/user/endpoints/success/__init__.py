from flasgger import SwaggerView, swag_from
from settings import DB

class ShowSuccessView(SwaggerView):

    @swag_from("get.yml")
    def get(self, countryCode: str):
        res = {"message": "ok", "data": DB.getSuccessByCountry(countryCode)}
        return res
