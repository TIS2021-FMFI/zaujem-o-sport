from flasgger import SwaggerView
from verification.jwt import is_secretary
from settings import DB

class BranchCode(SwaggerView):

	@is_secretary
	def get(self, sportCode: str):
		return {"message": "ok", "newBranchCode": DB.suggestNewBranchCode(sportCode)}
