from flasgger import SwaggerView
from verification.jwt import is_secretary
from settings import DB


class ShowInterconnectnessTypeView(SwaggerView):

    def get(self):
        res = {"message": "ok", "data": DB.getInterconnTypes()}
        return res
