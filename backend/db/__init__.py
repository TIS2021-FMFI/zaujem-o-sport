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
		""" Use in secretary login process. """
		sql = "select * from users where email=%s and type='secretary'"
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

	def getAdmin(self, email: str) -> Union[None, dict]:
		""" Use in admin login process. """
		sql = "select * from users where email=%s and type='admin'"
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
		sql = "select b.title, f.absolute_funding, f.currency from funding f cross join country c join branch b on c.code = %(country_code)s and f.country_id = c.id and b.id = f.branch_id"
		result = {"funding": []}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql, {"country_code":country_code})
					tmp = cursor.fetchone()
					while tmp:
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

		sql = "select c.name, suc.points, suc.orders from success suc cross join sport sp join country c on suc.sport_id = sp.id and sp.code = %(sport_code)s and suc.country_id = c.id order by suc.orders;"
		result = {"success": []}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql, {"sport_code": sport_code})
					tmp = cursor.fetchone()
					while tmp:
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

		sql = "select sp.title, suc.points, suc.orders from success suc cross join sport sp join country c on suc.sport_id = sp.id and c.code = %(country_code)s and suc.country_id = c.id order by suc.orders;"
		result = {"success": []}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql, {"country_code":country_code})
					tmp = cursor.fetchone()
					while tmp:
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

		sql = "select c2.name, i.value, it.title  from interconnectness i join country c1 on country_one_id = c1.id join country c2 on country_two_id = c2.id join interconnectness_type it on i.type_id = it.id where i.type_id = %(type_id)s and c1.code = %(country_code)s "
		result = {"interconnectness": []}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql, {"type_id":type_id, "country_code":country_code})
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

	def addSport(self, data : dict):
		if "code" not in data:
			raise DataError("sport data do not contain code")
		if "title" not in data:
			raise DataError("sport data do not contain title")

		sql = "insert into sport(code, title) values (%(code)s, %(title)s);"
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql, {"code":data['code'], "title":data['title'] })
			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print(error)


	def addBranch(self, data : dict):
		...

	def updateSport(self, data: dict):
		...

	def importFundingData(self):
		...

	def importSuccessdata(self):
		...

	def importInterconnectnessData(self):
		...


	# getters for DB mirroring in data computation modul

	def getBGS(self) -> dict:

		sql = "select sport_id, value from BGS"
		result = {"BGS": []}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql)
					tmp = cursor.fetchone()
					while tmp:
						result["BGS"].append({"sport_id": tmp[0], "value": tmp[1]})
						tmp = cursor.fetchone()
			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print(error)
		finally:
			# print(result)

			result = result["BGS"]
			final_result = {}

			for record in result:
				final_result[record["sport_id"]] = record["value"]

			return final_result

	def getOrder(self) -> dict:

		sql = "select country_id, sport_id, orders from success"
		result = {"order": []}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql)
					tmp = cursor.fetchone()
					while tmp:
						country_id, sport_id, order = tmp
						result["order"].append({"country_id": country_id, "sport_id": sport_id, "order":order})
						tmp = cursor.fetchone()

			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print("this err", error)
		finally:
			# print(result)
			final_result = {}

			for record in result["order"]:

				country_id, sport_id, order = record["country_id"] , record["sport_id"] , record["order"]

				if record["country_id"] not in final_result:
					final_result[country_id] = {}

				final_result[country_id][sport_id] = order

			return final_result

	def getPoints(self) -> dict:

		sql = "select country_id, sport_id, points from success"
		result = {"points": []}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql)
					tmp = cursor.fetchone()
					while tmp:
						country_id, sport_id, points = tmp
						result["points"].append({"country_id": country_id, "sport_id": sport_id, "points": points})
						tmp = cursor.fetchone()

			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print("this err", error)
		finally:
			# print(result)
			final_result = {}

			for record in result["points"]:

				country_id, sport_id, points = record["country_id"], record["sport_id"], record["points"]

				if record["country_id"] not in final_result:
					final_result[country_id] = {}

				final_result[country_id][sport_id] = points

			return final_result

	def getMaxPoints(self) -> dict:

		sql = "select sport_id, max(points) from success group by sport_id"
		result = {"points": []}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql)
					tmp = cursor.fetchone()
					while tmp:
						sport_id, points = tmp
						result["points"].append({"sport_id": sport_id, "points": points})
						tmp = cursor.fetchone()

			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print("this err", error)
		finally:
			# print(result)
			final_result = {}

			for record in result["points"]:

				sport_id, points = record["sport_id"], record["points"]

				final_result[sport_id] = points

			return final_result

	def getNumCountriesInSport(self) -> dict:

		sql = "select sport_id, count(id) from success where points > 0 group by sport_id"
		result = {"num": []}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql)
					tmp = cursor.fetchone()
					while tmp:
						sport_id, num = tmp
						result["num"].append({"sport_id": sport_id, "num": num})
						tmp = cursor.fetchone()

			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print(error)
		finally:
			# print(result)
			final_result = {}

			for record in result["num"]:

				sport_id, num = record["sport_id"], record["num"]

				final_result[sport_id] = num

			return final_result

	def getTotalCountryPoints(self) -> dict:

		sql = "select country_id, sum(points) from success group by country_id"
		result = {"sum": []}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql)
					tmp = cursor.fetchone()
					while tmp:
						country_id, suma = tmp
						result["sum"].append({"country_id": country_id, "sum": suma})
						tmp = cursor.fetchone()

			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print(error)
		finally:
			# print(result)
			final_result = {}

			for record in result["sum"]:

				country_id, suma = record["country_id"], record["sum"]

				final_result[country_id] = suma

			return final_result

	def getMinOrder(self) -> dict:

		sql = "select country_id, min(orders) from success group by country_id"
		result = {"order": []}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql)
					tmp = cursor.fetchone()
					while tmp:
						country_id, order = tmp
						result["order"].append({"country_id": country_id, "order": order})
						tmp = cursor.fetchone()

			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print(error)
		finally:
			# print(result)
			final_result = {}

			for record in result["order"]:

				country_id, order = record["country_id"], record["order"]

				final_result[country_id] = order

			return final_result

	def getEconIntercon(self) -> dict:

		sql = "select country_one_id, country_two_id, value from interconnectness where type_id = 1"
		result = {"inter": []}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql)
					tmp = cursor.fetchone()
					while tmp:
						country_one_id, country_two_id, value = tmp
						result["inter"].append({"country_one_id": country_one_id, "country_two_id": country_two_id, "value": value})
						tmp = cursor.fetchone()

			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print(error)
		finally:
			# print(result)
			final_result = {}

			for record in result["inter"]:
				country_one_id, country_two_id, value = record["country_one_id"], record["country_two_id"], record["value"]

				if country_one_id not in final_result:
					final_result[country_one_id] = {}

				final_result[country_one_id][country_two_id] = value

			return final_result

	def getNonEconIntercon(self) -> dict:

		sql = "select country_one_id, country_two_id, value from interconnectness where type_id = 2"
		result = {"inter": []}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql)
					tmp = cursor.fetchone()
					while tmp:
						country_one_id, country_two_id, value = tmp
						result["inter"].append({"country_one_id": country_one_id, "country_two_id": country_two_id, "value": value})
						tmp = cursor.fetchone()

			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print(error)
		finally:
			# print(result)
			final_result = {}

			for record in result["inter"]:
				country_one_id, country_two_id, value = record["country_one_id"], record["country_two_id"], record["value"]

				if country_one_id not in final_result:
					final_result[country_one_id] = {}

				final_result[country_one_id][country_two_id] = value

			return final_result

	def getNonCombiBranchFunding(self) -> dict:

		sql = "select f.country_id, sport_id, branch_id, sum(absolute_funding)  from funding f join branch b  on b.id = f.branch_id  and is_combined = false group by f.country_id, sport_id, branch_id"
		result = {"funding": []}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql)
					tmp = cursor.fetchone()
					while tmp:
						country_id, sport_id, branch_id, suma = tmp
						result["funding"].append(
							{"country_id":country_id, "sport_id":sport_id, "branch_id": branch_id, "sum": suma})
						tmp = cursor.fetchone()

			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print(error)
		finally:
			# print(result)
			final_result = {}

			for record in result["funding"]:
				country_id, sport_id, branch_id, suma  = record["country_id"], record["sport_id"], record["branch_id"], record["sum"]

				if country_id not in final_result:
					final_result[country_id] = {}


				final_result[country_id][sport_id] = suma

			return final_result

	def getActiveCountryIds(self) -> dict:

		sql = "select id, name from country where is_active = true"
		result = {"countries":[]}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql)
					tmp = cursor.fetchone()
					while tmp:
						result["countries"].append({"id":tmp[0], "name":tmp[1]})
						tmp = cursor.fetchone()
			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print(error)
		finally:
			# print(result)
			return result["countries"]

	def getSportIds(self) -> dict:

		sql = "select id, title from sport"
		result = {"sports":[]}
		try:
			with self._getConnection() as dbConn:
				with dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
					cursor.execute(sql)
					tmp = cursor.fetchone()
					while tmp:
						result["sports"].append({"id":tmp[0], "title":tmp[1]})
						tmp = cursor.fetchone()
			self._releaseConnection(dbConn)
		except psycopg2.DatabaseError as error:
			# TODO: logging
			# TODO: define standard for database error messages
			print(error)
		finally:
			# print(result)
			return result["sports"]


