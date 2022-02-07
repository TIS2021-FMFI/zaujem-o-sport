from flasgger import SwaggerView
from settings import DB

class ShowInterconnectnessTypeView(SwaggerView):

    def get(self):
        res = {"message": "ok", "data": DB.getInterconnTypes()}
        return res
