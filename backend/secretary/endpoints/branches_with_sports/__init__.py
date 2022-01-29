from flasgger import SwaggerView
from verification.jwt import is_secretary
from settings import DB

class BranchesWithSports(SwaggerView):

	@is_secretary
	def get(self):
		return {"message": "ok", "branchesWithSports": DB.getBranchesWithSports()}
