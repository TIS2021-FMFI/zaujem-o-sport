import sys
import settings
from settings import app, jwt
import endpoints.countries
import admin_secretary.endpoints.sport_code
import admin_secretary.endpoints.sports
import admin_secretary.endpoints.combi_branches
import admin_secretary.endpoints.combi_branches.new_code
import admin_secretary.endpoints.branches
import admin_secretary.endpoints.branches.new_code
import admin_secretary.endpoints.branches_with_sports
import admin_secretary.endpoints.countries
import secretary.endpoints.login
import secretary.endpoints.funding
import secretary.endpoints.funding_currencies
import admin.endpoints.login
import admin.endpoints.upload
import secretary.endpoints.show_countries
import user.endpoints.success
import user.endpoints.chart
import user.endpoints.show_countries

@app.errorhandler(400)
def bad_request(e):
	print(e)
	return {"message": "Bad request.", "data": {}}, 400

@app.errorhandler(404)
def not_found(e):
	return {"message": "Not found.", "data": {}}, 404

@app.errorhandler(405)
def method_not_allowed(e):
	return {"message": "Method is not allowed.", "data": {}}, 405

@app.errorhandler(410)
def gone(e):
	return {"message": "Gone.", "data": {}}, 410

@app.errorhandler(500)
def internal_server_error(e):
	return {"message": "Internal server error.", "data": {}}, 500

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
	return {"message": "Token has expired", "data": {}}, 401

@jwt.invalid_token_loader
def invalid_token_callback(callback):
	return {"message": "Signature verification failed", "data": {}}, 422

@jwt.revoked_token_loader
def revoked_token_callback(jwt_header, jwt_payload):
	return {"message": "Token has been revoked", "data": {}}, 401

@jwt.unauthorized_loader
def unathorized_callback(callback):
	return {"message": "Missing Authorization Header", "data": {}}, 401

# ----- general -----

app.add_url_rule(
	"/api/countries",
	view_func=endpoints.countries.CountriesView.as_view("list_countries"),
	methods=["GET"]
)

# ----- admin & secretary shared routes -----

app.add_url_rule(
	"/api/adminsecretary/sports/new-code",
	view_func=admin_secretary.endpoints.sport_code.SportCode.as_view("adminsecretary_sport_code"),
	methods=["GET"]
)

app.add_url_rule(
	"/api/adminsecretary/sports",
	view_func=admin_secretary.endpoints.sports.Sports.as_view("adminsecretary_get_sports"),
	methods=["GET"]
)

app.add_url_rule(
	"/api/adminsecretary/sports/add",
	view_func=admin_secretary.endpoints.sports.Sports.as_view("adminsecretary_add_sport"),
	methods=["POST"]
)

app.add_url_rule(
	"/api/adminsecretary/sports/update",
	view_func=admin_secretary.endpoints.sports.Sports.as_view("adminsecretary_update_sport"),
	methods=["PUT"]
)

app.add_url_rule(
	"/api/adminsecretary/branches-with-sports",
	view_func=admin_secretary.endpoints.branches_with_sports.BranchesWithSports.as_view("adminsecretary_branches_with_sports"),
	methods=["GET"]
)

app.add_url_rule(
	"/api/adminsecretary/combi-branches",
	view_func=admin_secretary.endpoints.combi_branches.CombiBranches.as_view("adminsecretary_combi_branches"),
	methods=["GET"]
)

app.add_url_rule(
	"/api/adminsecretary/branches/add",
	view_func=admin_secretary.endpoints.branches.Branches.as_view("adminsecretary_add_branch"),
	methods=["POST"]
)

app.add_url_rule(
	"/api/adminsecretary/combi-branches/add",
	view_func=admin_secretary.endpoints.combi_branches.CombiBranches.as_view("adminsecretary_add_combi_branch"),
	methods=["POST"]
)

app.add_url_rule(
	"/api/adminsecretary/combi-branches/new-code",
	view_func=admin_secretary.endpoints.combi_branches.new_code.BranchCode.as_view("adminsecretary_combi_branch_code"),
	methods=["GET"]
)

app.add_url_rule(
	"/api/adminsecretary/sport/<sportCode>/branches/new-code",
	view_func=admin_secretary.endpoints.branches.new_code.BranchCode.as_view("adminsecretary_branch_code"),
	methods=["GET"]
)

app.add_url_rule(
	"/api/adminsecretary/countries/add",
	view_func=admin_secretary.endpoints.countries.Countries.as_view("adminsecretary_add_country"),
	methods=["POST"]
)


# ----- secretary rules -----

app.add_url_rule(
	"/api/secretary/login",
	view_func=secretary.endpoints.login.LoginView.as_view("secretary_login"),
	methods=["POST"]
)

app.add_url_rule(
	"/api/secretary/funding/upload",
	view_func=secretary.endpoints.funding.Funding.as_view("secretary_funding_upload"),
	methods=["POST"]
)

app.add_url_rule(
	"/api/secretary/funding/currencies",
	view_func=secretary.endpoints.funding_currencies.Funding.as_view("secretary_funding_currencies"),
	methods=["GET"]
)

# ----- admin rules -----

app.add_url_rule(
	"/api/admin/login",
	view_func=admin.endpoints.login.LoginView.as_view("admin_login"),
	methods=["POST"]
)

app.add_url_rule(
	"/api/admin/upload",
	view_func=admin.endpoints.upload.UploadView.as_view("admin_upload"),
	methods=["POST"]
)

# ----- user rules -----
app.add_url_rule(
	"/api/user/success",
	view_func=user.endpoints.success.ShowSuccessView.as_view("list_success"),
	methods=["GET", "POST"]
)

app.add_url_rule(
	"/api/user/chart",
	view_func=user.endpoints.chart.ShowChartView.as_view("list_chart"),
	methods=["GET"]
)

app.add_url_rule(
	"/api/user/countries",
	view_func=user.endpoints.show_countries.ShowCountriesView.as_view("list_countries2"),
	methods=["GET"]
)

if __name__ == "__main__":
	ip = None
	if len(sys.argv) > 1:
		mode = sys.argv[1]
		ip = settings.DEVELOPMENT_IP if mode == "dev" else settings.PRODUCTION_IP if mode == "prod" else None
	if ip is None:
		print("Invalid mode.")
		quit(1)

	app.run(debug=True if mode == "dev" else False, host=ip, port=settings.PORT)
