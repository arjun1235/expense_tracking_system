from sqlalchemy_utils import database_exists, create_database
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base


# create database

path = 'postgresql://postgres:Arjun@localhost/project'
engine = create_engine(path)
if not database_exists(engine.url):
    create_database(engine.url)

# create tables
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()
