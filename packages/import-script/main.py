import psycopg2
import sys
import csv
import os
from dotenv import load_dotenv

load_dotenv()
CONDITION = 9
CATCHMENT = 4
FIRST_NAME = 5
LAST_NAME = 6
EMAIL = 7
UID = 8

def connect():
	conn = psycopg2.connect(host=os.getenv("DB_HOST"),database=os.getenv("DB_NAME"),port=os.getenv("DB_PORT"),user=os.getenv("DB_USER"),password=os.getenv("DB_PASSWORD"))
	cur = conn.cursor()
	cur.execute('SELECT * FROM "Email"')
	with open(sys.argv[1], 'r') as f:
		reader = csv.reader(f)
		next(reader)
		for row in reader:
			cur.execute('INSERT INTO "Email" VALUES (default, %s ,%s, %s, default, default, default, %s, %s)', (row[UID],row[EMAIL], row[CONDITION],row[FIRST_NAME]+" "+row[LAST_NAME],row[CATCHMENT].split()[0]))
	conn.commit()
	conn.close()
	print('Database connection closed.')


if __name__ == '__main__':
    connect()