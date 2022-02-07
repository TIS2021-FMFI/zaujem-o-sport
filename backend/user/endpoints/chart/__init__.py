from flasgger import SwaggerView
from flask import request
import importlib  # can be resolved by removing '-' from the data-computation name
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




