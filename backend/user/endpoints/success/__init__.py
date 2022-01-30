from flasgger import SwaggerView
from verification.jwt import is_secretary
from settings import DB
from flask import request


class ShowSuccessView(SwaggerView):

    #def get(self):
    #    res = {"message": "ok", "data": DB.getSuccessByCountry("SVK")}
    #    return res

    def post(self):
        code = request.json.get("code")
        res = {"message": "ok", "data": DB.getSuccessByCountry(code)}
        return res
