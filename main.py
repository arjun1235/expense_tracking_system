# database tables
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

from model_user import Users
from model_emi import EMIs
from model_expense import Expense
from models_saving import Savings
from model_category import Categories
from model_wishlist import Wishlist


# standard imports
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from sqlalchemy.orm import sessionmaker
from ariadne import QueryType, ObjectType, MutationType, ScalarType, make_executable_schema
from ariadne.asgi import GraphQL
from starlette.applications import Starlette
from sqlalchemy import create_engine
from ariadne import load_schema_from_path
from graphql import GraphQLScalarType
from datetime import datetime
# create database

path = 'postgresql://postgres:Arjun@localhost/project'
engine = create_engine(path)
if not database_exists(engine.url):
    create_database(engine.url)

# create tables
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

schema = load_schema_from_path('schema.graphql')
query = QueryType()
# mutation = MutationType()
user = ObjectType("User")



@query.field("users")
def resolver_user(*_):
    user = session.query(Users)
    return user

@query.field("saving")
def resolver_saving(*_):
    save = session.query(Savings)
    return save

@query.field("expense")
def resolver_expense(*_):
    expen = session.query(Expense)
    return expen

@query.field("user_one")
def resolver_oneuser(*_,id):
    user = session.query(Users).where(Users.id == id).first()
    return user

@query.field("saving_one")
def resolver_savingone(*_,id):
    sav = session.query(Savings).where(Savings.id == id).first()
    return sav

@query.field("expense_one")
def resolver_expenseone():
    expen = session.query(Expense).where(Expense.id == id).first()
    return expen

@user.field("saving")
def resolver_savingone(root,info):
    sav = session.query(Savings).where(Savings.user_id == root.id).first()
    return sav

@user.field("expense")
def resolver_expenses(root,info):
    exp = session.query(Expense).where(Expense.user_id == root.id).first()
    return exp


execute_schema = make_executable_schema(schema,query,user)
middleware = [Middleware(CORSMiddleware, allow_origins=['*'], allow_methods=['*'])]
app = Starlette(debug=True, middleware=middleware)
app.mount("/graphql/", GraphQL(execute_schema, debug=True))
