from flask import jsonify
from flasgger import SwaggerView


class LoginView(SwaggerView):
	def get(self):
		return jsonify({"message": "Hello World!"})