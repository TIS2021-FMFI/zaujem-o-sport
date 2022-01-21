from flasgger import SwaggerView
from verification.jwt import is_secretary
from settings import DB


class ShowChartView(SwaggerView):

    def get(self):
        res = {"message": "ok", "data": DB.getSuccessBySport('48')}
        print(res)
        return res
