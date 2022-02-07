from flasgger import SwaggerView
from settings import DB

class ShowFundingView(SwaggerView):

    def get(self, countryCode: str):
        res = {"message": "ok", "data": DB.getFundingData(countryCode)}
        return res
