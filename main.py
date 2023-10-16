# database tables
from models.model_user import Users
from models.model_emi import EMIs
from models.model_expense import Expense
from models.model_balance import Balances
from models.model_category import Categories
from models.model_wishlist import Wishlist
from models.model_income import Incomes
from models.model_saving import Savings

# standard imports
from ariadne.exceptions import HttpBadRequestError
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from ariadne import QueryType, MutationType, make_executable_schema, ScalarType
from ariadne.asgi import GraphQL
from starlette.applications import Starlette

from ariadne import load_schema_from_path
from creation import session

schema = load_schema_from_path('graphql/schema.graphql')
query = QueryType()
mutation = MutationType()

datetime_scalar = ScalarType("Date")
@datetime_scalar.serializer
def resolve_date(value):
    return value.isoformat()

@query.field("users")
def resolver_user(*_):
    user = session.query(Users)
    return user

@query.field("catogeries")
def resolver_catogeries(*_):
    cat = session.query(Categories)
    return cat

@query.field("balance")
def resolver_balance(*_):
    bal = session.query(Balances)
    return bal

@query.field("expense")
def resolver_expense(*_):
    expen = session.query(Expense)
    return expen

@query.field("userOne")
def resolver_oneuser(*_,id):
    user = session.query(Users).where(Users.id == id).first()
    return user

@query.field("catogeriesOne")
def resolver_catogeriesone(*_,id):
    cat = session.query(Categories).where(Users.id == id).first()
    return cat
@query.field("balanceOne")
def resolver_balanceOne(*_,user_id):
    bal = session.query(Balances).where(Balances.user_id == user_id).first()
    return bal

@query.field("expenseOne")
def resolver_expenseone(*_,id):
    expen = session.query(Expense).where(Expense.id == id).first()
    return expen

@query.field("income")
def resolver_income(*_):
    inc = session.query(Incomes)
    return inc

@query.field("incomeOne")
def resolver_income(*_,id):
    inc = session.query(Incomes).where(Incomes.id == id).first()
    return inc

# @user.field("saving")
# def resolver_saving_user(root,info):
#     sav = session.query(Savings).where(Savings.user_id == root.id).first()
#     return sav

# @user.field("expense")
# def resolver_expenses_user(root,info):
#     exp = session.query(Expense).where(Expense.user_id == root.id).first()
#     return exp
#
# @user.field("emi")
# def resolver_emi_user(root,info):
#     em = session.query(EMIs).where(EMIs.user_id == root.id).first()
#     return em
#
# @user.field("wishlist")
# def resolver_wishlist_user(root,info):
#     whis = session.query(Wishlist).where(Wishlist.user_id == root.id).first()
#     return whis

################################################ mutaition add
@mutation.field("addUser")
def resolver_add_user(*_,user):
    # id_check = session.query(Users).where(user["id"] == Users.id).first()
    # email_check = session.query(Users).where(user["email"] == Users.email).first()
    # username_check = session.query(Users).where(user["user_name"]== Users.user_name).first()
    # if id_check:
    #     raise HttpBadRequestError("id already exists")
    # if email_check:
    #     raise HttpBadRequestError("email already exists")
    # if username_check:
    #     raise HttpBadRequestError("username already exists")
    userobj = Users(user["first_name"],user["middle_name"], user["last_name"],user["gender"],user["email"],user["user_name"],user["password"])
    session.add(userobj)
    session.commit()
    return userobj

@mutation.field("addCategorise")
def resolver_add_categories(*_,categories):
    # check_id = session.query(Categories).where(Categories.id == categories["id"]).first()
    # if check_id:
    #     return HttpBadRequestError("id already exists")
    categoriesobj = Categories(categories["name"])
    session.add(categoriesobj)
    session.commit()
    return categoriesobj

@mutation.field("addWishlist")
def resolver_add_wishlist(*_,wishlist):
    # check_id = session.query(Wishlist).where(Wishlist.id == wishlist["id"]).first()
    # if check_id:
    #     raise HttpBadRequestError("id already exists")
    wishlistobj = Wishlist(wishlist["user_id"],wishlist["category_id"],wishlist["item_name"],wishlist["estimate_cost"],wishlist["status"],wishlist["priority"],wishlist["source"])
    session.add(wishlistobj)
    session.commit()
    return wishlistobj

@mutation.field("addExpense")
def resolver_add_expense(*_,expense):
    balance_obj = session.query(Balances).filter(Balances.user_id == expense["user_id"])

    expenseobj = Expense(expense["id"],expense["user_id"],expense["category_id"],expense["amount"],expense["description"],expense["date"])
    if expense["amount"] < balance_obj.first().amount:
        session.add(expenseobj)
    else:
        raise HttpBadRequestError("not enough balance")
    balance_obj.update({Balances.amount : ( balance_obj.first().amount - expense["amount"])})
    session.commit()

    return expenseobj

@mutation.field("addSaving")
def resolver_addSaving(*_,saving):
    saving_obj = Savings(saving["user_id"],saving["amount"])
    balance_obj = session.query(Balances).filter(Balances.user_id == saving["user_id"])
    if saving["amount"] < balance_obj.first().amount:
        session.add(saving_obj)
    else:
        raise HttpBadRequestError("not enough balance")
    balance_obj.update({Balances.amount : (balance_obj.first().amount - saving["amount"])})
    session.commit()
    return saving_obj

@mutation.field("addEmis")
def resolver_add_emis(*_,emi):
    balance_obj = session.query(Balances).filter(Balances.user_id == emi["user_id"])
    emisobj = EMIs(emi["user_id"],emi["category_id"],emi["lender"],emi["amount"],emi["interest_rate"],emi["start_date"],emi["end_date"])
    if emi["amount"] > balance_obj.first().amount:
        session.add(emisobj)
    else:
        raise HttpBadRequestError("not enough balances")
    balance_obj.update({Balances.amount : (balance_obj.first().amount - emi["amount"])})
    session.commit()
    return emisobj

@mutation.field("addIncome")
def resolver_add_income(*_,income):
    # check_userid = session.query(Users).where(Users.id == income["user_id"]).first()
    # if not check_userid:
    #     raise HttpBadRequestError("user doesnot exist")
    incomeobj = Incomes(income["user_id"],income["amount"],income["description"],income["date"])
    session.add(incomeobj)
    session.commit()
    balance_obj = session.query(Balances).filter(Balances.user_id == income["user_id"])
    if balance_obj.first():
        balance_obj.update({Balances.amount : ( balance_obj.first().amount + income["amount"])})
    else:
        balanceobj = Balances(income["user_id"],income["amount"])
        session.add(balanceobj)
    session.commit()
    return incomeobj

#################################################mutation edit
@mutation.field("updateUser")
def resolver_updateUser(*_,id,user):
    data = session.query(Users).filter(Users.id == id)
    if "first_name" in user:
        data.update({Users.first_name : user["first_name"]})
    if "middle_name" in user:
        data.update({Users.middle_name : user["middle_name"]})
    if "last_name" in user:
        data.update({Users.last_name : user["last_name"]})
    if "gender" in user:
        data.update({Users.gender : user["gender"]})
    if "password" in user:
        data.update({Users.password : user["password"]})
    session.commit()
    return data.first()

@mutation.field("updateWishlist")
def resolver_updateWishlist(*_,id,wishlist):
    data = session.query(Wishlist).filter(Wishlist.id == id)
    if "item_name" in wishlist:
        data.update({Wishlist.item_name : wishlist["item_name"]})
    if "estimate_cost" in wishlist:
        data.update({Wishlist.estimated_cost : wishlist["estimate_cost"]})
    if "status" in wishlist:
        data.update({Wishlist.status : wishlist["status"]})
    if "source" in wishlist:
        data.update({Wishlist.source : wishlist["source"]})
    session.commit()
    return data.first()

@mutation.field("updateCategorise")
def resolver_updateCategories(*_,id,categories):
    data = session.query(Categories).filter(Categories.id == id)
    if "name" in categories:
        data.update({Categories.name : categories["name"]})
    session.commit()
    return data.first()

@mutation.field("updateBalances")
def resolver_updateBalances(*_,user_id,balance):
    data = session.query(Balances).filter(Balances.user_id == user_id)
    if "amount" in balance:
        data.update({Balances.amount : balance["amount"]})
    session.commit()
    return data.first()

@mutation.field("updateExpense")
def resolve_updateExpense(*_,id,expense):
    data = session.query(Expense).filter(Expense.id == id)
    if "amount" in expense:
        data.update({Expense.amount : expense["amount"]})
    if "description" in expense:
        data.update({Expense.description : expense["description"]})
    if "date" in expense:
        data.update({Expense.date : expense["date"]})
    session.commit()
    return data.first()

@mutation.field("updateEmis")
def resolver_updateEmis(*_,id,emi):
    data = session.query(EMIs).filter(EMIs.id == id )
    if "lender" in emi:
        data.update({EMIs.lender : emi["lender"]})
    if "amount" in emi:
        data.update({EMIs.amount : emi["amount"]})
    if "interest" in emi:
        data.update({EMIs.interest_rate : emi["interest_rate"]})
    if "start_date" in emi:
        data.update({EMIs.start_date : emi["start_date"]})
    if "end_date" in emi:
        data.update({EMIs.end_date : emi["end_date"]})
    session.commit()
    return data.first()

@mutation.field("updateIncome")
def resolver_updateIncome(*_,id, income):
    data = session.query(Incomes).filter(Incomes.id == id)
    if "amount" in income:
        data.update({Incomes.amount : income["amount"]})
    if "description" in income:
        data.update({Incomes.description : income["description"]})
    if "date" in income:
        data.update({Incomes.date : income["date"]})
    session.commit()
    return data.first()

#####################################delete mutation
@mutation.field("deleteWishlist")
def resolve_deleteWishlist(*_,id):
    data = session.query(Wishlist).where(Wishlist.id == id).first()
    session.delete(data)
    session.commit()
    return data

@mutation.field("deleteBalances")
def resolver_deleteBalances(*_,user_id):
    data = session.query(Balances).where(Balances.user_id == user_id).first()
    session.delete(data)
    session.commit()
    return data

@mutation.field("deleteExpense")
def resolve_deleteExpense(*_,id):
    data = session.query(Expense).where(Expense.id == id).first()
    session.delete(data)
    session.commit()
    return data
@mutation.field("deleteEmis")
def resolve_deleteEmis(*_,id):
    data = session.query(EMIs).where(EMIs.id == id ).first()
    session.delete(data)
    session.commit()
    return data

@mutation.field("deleteIncome")
def resolve_deleteIncome(*_,id):
    data = session.query(Incomes).where(Incomes.id == id ).first()
    session.delete(data)
    session.commit()
    return data
@mutation.field("deleteUser")
def resolve_deleteUser(*_,id):
    data = session.query(Users).where(Users.id == id).first()
    session.delete(data)
    session.commit()
    return data

@mutation.field("deleteCategories")
def resolver_deleteCategories(*_,id):
    data = session.query(Categories).where(Categories.id == id).first()
    session.delete(data)
    session.commit()
    return data


execute_schema = make_executable_schema(schema,query,mutation,datetime_scalar)
middleware = [Middleware(CORSMiddleware, allow_origins=['*'], allow_methods=['*'])]
app = Starlette(debug=True, middleware=middleware)
app.mount("/graphql/", GraphQL(execute_schema, debug=True))



