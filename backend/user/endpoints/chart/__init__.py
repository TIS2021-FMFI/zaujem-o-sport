from flasgger import SwaggerView
from verification.jwt import is_secretary
from settings import DB
from flask import request

import importlib #da sa vyriesit odstranenim pomlcky z data-computation
datacomputation = importlib.import_module("data-computation")

class ShowChartView(SwaggerView):

    def get(self):
        c = datacomputation.Computations()
        res = {"message": "ok", "data": c.getFinalOrderByCountryCode("SVK")}
        return res

    def post(self):
        c = datacomputation.Computations()
        code = request.json.get("code")
        res = {"message": "ok", "data": c.getFinalOrderByCountryCode(code)}
        return res




