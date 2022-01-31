from flasgger import SwaggerView
from verification.jwt import is_secretary
from settings import DB
from flask import request


class ShowFundingView(SwaggerView):

    def get(self):
        res = {"message": "ok", "data": DB.getFundingData("SVK")}
        return res

    def post(self):
        code = request.json.get("code")
        res = {"message": "ok", "data": DB.getFundingData(code)}
        return res
