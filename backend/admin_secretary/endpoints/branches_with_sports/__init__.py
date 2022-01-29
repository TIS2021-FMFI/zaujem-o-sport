from flasgger import SwaggerView
from verification.jwt import is_admin_or_secretary
from settings import DB

class BranchesWithSports(SwaggerView):

	@is_admin_or_secretary
	def get(self):
		return {"message": "ok", "branchesWithSports": DB.getBranchesWithSports()}
