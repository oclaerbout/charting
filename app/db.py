import os

import psycopg2
from psycopg2 import pool
from dotenv import load_dotenv

load_dotenv()

db_pool = psycopg2.pool.ThreadedConnectionPool(
    minconn=1,  # Minimum aantal verbindingen in de pool
    maxconn=10,  # Maximum aantal verbindingen in de pool
    dbname=os.getenv('DBNAME'),
    user=os.getenv("DBUSER"),
    password=os.getenv("DBPASSWORD"),
    host=os.getenv("DBHOST"),
    port=os.getenv("DBPORT"))

# Haal een verbinding uit de pool
def get_connection():
    try:
        return db_pool.getconn()
    except Exception as e:
        return None

# Geef een verbinding terug aan de pool
def release_connection(conn):
    try:
        db_pool.putconn(conn)
    except Exception as e:
        print(e)
