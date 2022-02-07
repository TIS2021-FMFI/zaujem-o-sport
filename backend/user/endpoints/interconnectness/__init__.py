from flasgger import SwaggerView
from settings import DB

class ShowInterconnectnessView(SwaggerView):

    def get(self, countryCode: str, interconnectednessType: int):
        res = {"message": "ok", "data": DB.getInterconnectnessData(interconnectednessType, countryCode)}
        return res
