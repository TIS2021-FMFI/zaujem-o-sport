from flasgger import SwaggerView
from settings import DB
from flask import request


class ShowInterconnectnessView(SwaggerView):

    def get(self):
        res = {"message": "ok", "data": DB.getInterconnectnessData(1, "SVK")}
        return res

    def post(self):
        code = request.json.get("code")
        typeid = request.json.get("typeid")
        res = {"message": "ok", "data": DB.getInterconnectnessData(typeid, code)}

        return res
