import psycopg2
from psycopg2 import pool
import psycopg2.extras
import psycopg2.extensions
from typing import Union


class DataError(Exception):
	pass


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

		sql = "select code, name from country where is_active = true"
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


	def getBranchesWithSports(self) -> dict:

		sql = "select s.code, s.title, b.code, b.title from sport s join branch b on b.sport_id = s.id"
		result = {"sports": []}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql)
					tmp = cursor.fetchone()
					while tmp:
						result["sports"].append({"sport_code": tmp[0], "sport_title": tmp[1], "branch_code": tmp[2], "branch_title": tmp[3]})
						tmp = cursor.fetchone()
			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print(error)
		finally:
			#print(result)
			return result


	def getFundingData(self, country_code: str) -> dict:
		sql = f"select b.title, f.absolute_funding, f.currency from funding f cross join country c join branch b on c.code = '{country_code}' and f.country_id = c.id and b.id = f.branch_id"
		result = {"funding": []}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql)
					tmp = cursor.fetchone()
					while tmp:
						print("x", tmp)
						result["funding"].append({"branch_id":tmp[0], "absolute_funding":tmp[1], "currency":tmp[2]})
						tmp = cursor.fetchone()
			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print(error)
		finally:
			# print(result)
			return result

	def getSuccessBySport(self, sport_code : str) -> dict:

		sql = f"select c.name, suc.points, suc.orders from success suc cross join sport sp join country c on suc.sport_id = sp.id and sp.code = {sport_code} and suc.country_id = c.id order by suc.orders;"
		result = {"success": []}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql)
					tmp = cursor.fetchone()
					while tmp:
						print("x", tmp)
						result["success"].append({"country_name": tmp[0], "points": tmp[1], "order": tmp[2]})
						tmp = cursor.fetchone()
			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print(error)
		finally:
			# print(result)
			return result

	def getSuccessByCountry(self, country_code : str) -> dict:

		sql = f"select sp.title, suc.points, suc.orders from success suc cross join sport sp join country c on suc.sport_id = sp.id and c.code = '{country_code}' and suc.country_id = c.id order by suc.orders;"
		result = {"success": []}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql)
					tmp = cursor.fetchone()
					while tmp:
						print("x", tmp)
						result["success"].append({"sport_name": tmp[0], "points": tmp[1], "order": tmp[2]})
						tmp = cursor.fetchone()
			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print(error)
		finally:
			# print(result)
			return result

	def getInterconnectnessData(self, type_id:int, country_code:str) -> dict:

		sql = f"select c2.name, i.value, it.title  from interconnectness i join country c1 on country_one_id = c1.id join country c2 on country_two_id = c2.id join interconnectness_type it on i.type_id = it.id where i.type_id = {type_id} and c1.code = '{country_code}' "
		result = {"interconnectness": []}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql)
					tmp = cursor.fetchone()
					while tmp:
						result["interconnectness"].append({"country": tmp[0], "value": tmp[1], "type": tmp[2]})
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
		if "code" not in data:
			raise DataError("sport data do not contain code")
		if "title" not in data:
			raise DataError("sport data do not contain title")

		sql = f"insert into sport(code, title) values ({data['code']}, '{data['title']}');"
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql)
			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print(error)


	def addBranch(self, data : dict) -> str:
		...

	def updateSport(self, data: dict) -> str:
		...

	def importFundingData(self):
		...

	def importSuccessdata(self):
		...

	def importInterconnectnessData(self):
		...


