import psycopg2
import sys
import csv
import os

UID = 9
SUBUID= 2
CONDITION = 10
USERID= 34

# 1 is the original import file, 2 is the file outputting to
# 3 os the email view log, 4 is the submission log

# reads the csv located at the path given as the first argument and print out index 34 (the user id) of each row
def csvreader():
  with open(sys.argv[1], 'r',encoding='utf-8') as inp, open(sys.argv[2], 'w',encoding='utf-8') as out:
    writer = csv.writer(out)
    # for every uid in the original file
    for row1 in csv.reader(inp):
      exist =  False
      # open the view log
      with open(sys.argv[3], 'r',encoding='utf-16') as f:
        reader = csv.reader(f, dialect=csv.excel)
        next(reader)
        # search the uid in the view log
        for row in reader:
          # if the uid exists in the view log, then change exist to true and break
          if row1[UID] == row[USERID]:
            exist = True
            print(row[USERID] + " email view")
            break
      with open(sys.argv[4], 'r',encoding='utf-8') as f:
        readers = csv.reader(f, dialect=csv.excel)
        next(readers)
        # search the uid in the view log
        for rows in readers:
          # if the uid exists in the view log, then change exist to true and break
          if row1[UID] == rows[SUBUID]:
            exist = True
            print(rows[SUBUID] + " submission")
            break
      # if the uid does not exist in the view log, then write the row to the new file
      if exist == False:
        print("does not exist "+row1[UID])
        row1[CONDITION] = row1[CONDITION] + " reminder"
        writer.writerow(row1)

if __name__ == '__main__':
  csvreader()