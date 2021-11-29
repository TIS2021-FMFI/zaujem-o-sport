import sys
import settings
from settings import app
import endpoints.login

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

app.add_url_rule(
	"/api/login",
	view_func=endpoints.login.LoginView.as_view("login"),
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
