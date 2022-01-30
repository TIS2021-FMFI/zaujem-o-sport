import sys
import settings
from settings import app, jwt
import secretary.endpoints.login
import secretary.endpoints.show_sports
import admin.endpoints.login
import secretary.endpoints.show_countries
import user.endpoints.success
import user.endpoints.chart
import user.endpoints.show_countries

@app.errorhandler(400)
def bad_request(e):
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

# ----- secretary rules -----

app.add_url_rule(
	"/api/secretary/login",
	view_func=secretary.endpoints.login.LoginView.as_view("secretary_login"),
	methods=["POST"]
)

app.add_url_rule(
	"/api/secretary/sports",
	view_func=secretary.endpoints.show_sports.ShowSportsView.as_view("list_sports"),
	methods=["GET"]
)

app.add_url_rule(
	"/api/secretary/countries",
	view_func=secretary.endpoints.show_countries.ShowCountriesView.as_view("list_countries"),
	methods=["GET"]
)

# ----- admin rules -----

app.add_url_rule(
	"/api/admin/login",
	view_func=admin.endpoints.login.LoginView.as_view("admin_login"),
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

app.add_url_rule(
	"/api/user/interconnectness",
	view_func=user.endpoints.interconnectness.ShowInterconnectnessView.as_view("list_interconnectness"),
	methods=["GET", "POST"]
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
