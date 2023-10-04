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
from model_income import Incomes

# standard imports
from ariadne.exceptions import HttpBadRequestError
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
mutation = MutationType()
user = ObjectType("User")

@query.field("users")
def resolver_user(*_):
    print("printing uesr")
    user = session.query(Users)
    return user

@query.field("catogeries")
def resolver_catogeries(*_):
    cat = session.query(Categories)
    return cat

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

@query.field("catogeries_one")
def resolver_catogeriesone(*_,id):
    cat = session.query(Categories).where(Users.id == id).first()
    return cat
@query.field("saving_one")
def resolver_savingone(*_,id):
    sav = session.query(Savings).where(Savings.id == id).first()
    return sav

@query.field("expense_one")
def resolver_expenseone():
    expen = session.query(Expense).where(Expense.id == id).first()
    return expen

@user.field("saving")
def resolver_saving_user(root,info):
    sav = session.query(Savings).where(Savings.user_id == root.id).first()
    return sav

@user.field("expense")
def resolver_expenses_user(root,info):
    exp = session.query(Expense).where(Expense.user_id == root.id).first()
    return exp

@user.field("emi")
def resolver_emi_user(root,info):
    em = session.query(EMIs).where(EMIs.user_id == root.id).first()
    return em

@user.field("wishlist")
def resolver_wishlist_user(root,info):
    whis = session.query(Wishlist).where(Wishlist.user_id == root.id).first()
    return whis

################################################ mutaition add
@mutation.field("add_user")
def resolver_add_user(*_,user):
    id_check = session.query(Users).where(user["id"] == Users.id).first()
    email_check = session.query(Users).where(user["email"] == Users.email).first()
    username_check = session.query(Users).where(user["user_name"]== Users.user_name).first()
    if id_check:
        raise HttpBadRequestError("id already exists")
    if email_check:
        raise HttpBadRequestError("email already exists")
    if username_check:
        raise HttpBadRequestError("username already exists")
    userobj = Users(user["id"],user["first_name"],user["middle_name"], user["last_name"],user["gender"],user["email"],user["user_name"],user["password"])
    session.add(userobj)
    session.commit()
    return userobj

@mutation.field("add_categorise")
def resolver_add_categories(*_,categories):
    check_id = session.query(Categories).where(Categories.id == categories["id"]).first()
    if check_id:
        return HttpBadRequestError("id already exists")
    categoriesobj = Categories(categories["id"],categories["name"])
    session.add(categoriesobj)
    session.commit()
    return categoriesobj

@mutation.field("add_wishlist")
def resolver_add_wishlist(*_,wishlist):
    check_id = session.query(Wishlist).where(Wishlist.id == wishlist["id"]).first()
    if check_id:
        raise HttpBadRequestError("id already exists")
    wishlistobj = Wishlist(wishlist["id"],wishlist["user_id"],wishlist["item_name"],wishlist["estimate_cost"],wishlist["status"])
    session.add(wishlistobj)
    session.commit()
    return wishlistobj

@mutation.field("add_savings")
def resolver_for_savings(*_,saving):
    check_id = session.query(Savings).where(Savings.id == saving["id"]).first()
    if check_id:
        raise HttpBadRequestError("id already exists")
    savingobj = Savings(saving["id"],saving["user_id"],saving["amount"],saving["description"],saving["date"])
    session.add(savingobj)
    session.commit()
    return savingobj

@mutation.field("add_expense")
def resolver_add_expense(*_,expense):
    checkid = session.query(Expense).where(Expense.id == expense["id"]).first()
    if checkid:
        raise HttpBadRequestError("id already exists")
    expenseobj = Expense(expense["id"],expense["user_id"],expense["category_id"],expense["amount"],expense["description"],expense["date"])
    session.add(expenseobj)
    session.commit()
    return expenseobj

@mutation.field("add_emis")
def resolver_add_emis(*_,emi):
    check_id = session.query(EMIs).where(EMIs.id == emi["id"]).first()
    if check_id:
        raise HttpBadRequestError("id already exists")
    emisobj = EMIs(emi["id"],emi["user_id"],emi["lender"],emi["amount"],emi["interest_rate"],emi["start_date"],emi["end_date"])
    session.add(emisobj)
    session.commit()
    return emisobj



execute_schema = make_executable_schema(schema,query,user,mutation)
middleware = [Middleware(CORSMiddleware, allow_origins=['*'], allow_methods=['*'])]
app = Starlette(debug=True, middleware=middleware)
app.mount("/graphql/", GraphQL(execute_schema, debug=True))
