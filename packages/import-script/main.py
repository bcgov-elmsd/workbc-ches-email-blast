import psycopg2
import sys
import csv
import os
from dotenv import load_dotenv

load_dotenv()
TREAMENT = 1
CATCHMENT = 5
FIRST_NAME = 6
LAST_NAME = 7
EMAIL = 8

def connect():
	conn = psycopg2.connect(host=os.getenv("DB_HOST"),database=os.getenv("DB_NAME"),port=os.getenv("DB_PORT"),user=os.getenv("DB_USER"),password=os.getenv("DB_PASSWORD"))
	cur = conn.cursor()
	cur.execute('SELECT * FROM "Email"')
	# print(sys.argv[1])
	with open(sys.argv[1], 'r') as f:
		reader = csv.reader(f)
		next(reader)
		for row in reader:
			template = ""
			if row[TREAMENT]=="1":
				template = "1 shortform"
			elif row[TREAMENT]=="2":
				template = "1 longform"
			elif row[TREAMENT]=="3":
				template = "2 shortform"
			# print(row[CATCHMENT].split()[0]+row[FIRST_NAME]+row[LAST_NAME]+row[EMAIL])
			cur.execute('INSERT INTO "Email" VALUES (default, %s, %s, default, default, default, %s, %s)', (row[EMAIL], template,row[FIRST_NAME]+" "+row[LAST_NAME],row[CATCHMENT].split()[0]))
	conn.commit()
	conn.close()
	print('Database connection closed.')


if __name__ == '__main__':
    connect()
