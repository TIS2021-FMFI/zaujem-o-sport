from flasgger import SwaggerView
from verification.jwt import is_secretary
from settings import DB


class ShowSuccessView(SwaggerView):

    def get(self):
        res = {"message": "ok", "data": DB.getSuccessByCountry("SVK")}

        return res
