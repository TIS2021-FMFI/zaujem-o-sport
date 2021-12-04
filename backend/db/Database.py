from os import environ as env
import psycopg2


class Database:

    def get_connection(trash = 0):
        conn = psycopg2.connect(
            host=env.get("DB_HOST"),
            database=env.get("DB_NAME"),
            user=env.get("DB_USER"),
            password=env.get("DB_PASSWORD")
        )
        return conn


# usage example
c = Database.get_connection()
cur = c.cursor()
cur.execute("SELECT * FROM country")
print(cur.fetchone())
print(cur.fetchone())
print(cur.fetchone())