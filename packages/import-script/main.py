import psycopg2
import sys
import csv
import os
from dotenv import load_dotenv

load_dotenv()
TREAMENT = 2
CATCHMENT = 6
FIRST_NAME = 7
LAST_NAME = 8
EMAIL = 9
UID = 0

def connect():
	conn = psycopg2.connect(host=os.getenv("DB_HOST"),database=os.getenv("DB_NAME"),port=os.getenv("DB_PORT"),user=os.getenv("DB_USER"),password=os.getenv("DB_PASSWORD"))
	cur = conn.cursor()
	cur.execute('SELECT * FROM "Email"')
	with open(sys.argv[1], 'r') as f:
		reader = csv.reader(f)
		next(reader)
		for row in reader:
			cur.execute('INSERT INTO "Email" VALUES (default, %s ,%s, %s, default, default, default, %s, %s)', (row[UID],row[EMAIL], row[TREAMENT],row[FIRST_NAME]+" "+row[LAST_NAME],row[CATCHMENT].split()[0]))
	conn.commit()
	conn.close()
	print('Database connection closed.')


if __name__ == '__main__':
    connect()
