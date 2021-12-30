import psycopg2
from psycopg2 import pool
import psycopg2.extras
import psycopg2.extensions
from typing import Union

class Database:
	def __init__(self, dbPool: psycopg2.pool.ThreadedConnectionPool):
		self.dbPool = dbPool

	def _getConnection(self) -> psycopg2.extensions.connection:
		dbConn = self.dbPool.getconn()
		return dbConn

	def _releaseConnection(self, dbConnection: psycopg2.extensions.connection):
		self.dbPool.putconn(dbConnection)

	def getSecretary(self, email: str) -> Union[None, dict]:
		""" Use in login process. """
		sql = "select * from users where email=%s"
		result = None
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql, (email,))
					result = cursor.fetchone()
			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print(error)
		finally:
			return result


	def getAllCountries(self) -> dict:

		sql = "select code, name from country" # where is_active = true"
		result = {"countries":[]}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql)
					tmp = cursor.fetchone()
					while tmp:
						result["countries"].append({"name":tmp[1], "code":tmp[0]})
						tmp = cursor.fetchone()
			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print(error)
		finally:
			# print(result)
			return result


	def getAllSports(self) -> dict:

		sql = "select code, title from sport"
		result = {"sports":[]}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql)
					tmp = cursor.fetchone()
					while tmp:
						result["sports"].append({"title":tmp[1], "code":tmp[0]})
						tmp = cursor.fetchone()
			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print(error)
		finally:
			# print(result)
			return result



	def addSport(self, data : dict) -> str:
		...

	def addBranch(self, data : dict) -> str:
		...

	def getInactiveCountries(self) -> dict:

		sql = "select code, name from country where is_active = false"
		result = {"countries": []}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql)
					tmp = cursor.fetchone()
					while tmp:
						result["countries"].append({"name": tmp[1], "code": tmp[0]})
						tmp = cursor.fetchone()
			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print(error)
		finally:
			# print(result)
			return result


