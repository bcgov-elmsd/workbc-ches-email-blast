# import-script

Script to update the trial database using Python

## Installation

Install the required packages for this application

```bash
pip3 install -r requirements.txt
```
or
```bash
pip install -r requirements.txt
```

## Usage

Fill out a .env with the database informations using the provided .env.sample file

sample.csv will be the csv file you have containing the data for the trial

```bash
python3 main.py sample.csv
```

## CSV File Conventions
See ```sample.csv``` for an example of a correctly formatted csv file

0. **ID**, the client's TRF identifier
1. **GENDER**
2. **BIRTH_YEAR**
3. **EDUCATION**, the highest level of education
4. **CATCHMENT**, the client's WorkBC catchment (excluding catchment 21 - Surrey Newton)
5. **FIRST_NAME**
6. **LAST_NAME**
7. **EMAIL_ADDR**, the client's email address
8. **WORKBC_INVOLVEMENT**, the client's previous history with WorkBC
9. **UID**, a randomly generated, 15-character alphanumberic string ending in "uid". Used for identification in Matomo
10. **condition**, the client's randomly assigned treatment group for the trial which specifies the type of email and form to send them.
    - Standard long
    - Standard short
    - AC long
    - AC short
    - Past WorkBC Client Email
    - Control
