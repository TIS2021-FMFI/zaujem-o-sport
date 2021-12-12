from functools import wraps
from flask_jwt_extended import jwt_required, get_jwt
from app_types import UserTypes

def is_secretary(f):
	"""
	Request validation with JWT token.
	Use this decorator on any route that needs authetication of secretary.
	"""
	@jwt_required()
	@wraps(f)
	def decorated_function(*args, **kwargs):
		jwtData = get_jwt()
		userType = jwtData.get("userType")
		if userType == UserTypes.SECRETARY:
			return f(*args, **kwargs)
		return {"status": "error", "message": "some default respone to be defined in types.py"}

	return decorated_function

@jwt_required()
def is_admin(f):
	@wraps(f)
	def decorated_function(*args, **kwargs):
		# TODO
		return f(*args, **kwargs)

	return decorated_function