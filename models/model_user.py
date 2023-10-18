from sqlalchemy import Integer, Column, String
from models import Base
from sqlalchemy.orm import relationship
class Users(Base):
    __tablename__ = 'users'
    id = Column(Integer,primary_key=True)
    first_name = Column(String(20), nullable=False)
    last_name = Column(String(20), nullable= False)
    gender = Column(String(20), nullable=False)
    email = Column(String(40), nullable=True, unique=True)
    user_name = Column(String(20), nullable=False, unique=True)
    password = Column(String(80), nullable=False)
    wishlist = relationship("Wishlist", cascade="delete, merge, save-update")
    expense = relationship("Expense", cascade="delete, merge, save-update",back_populates="user")
    emis = relationship("EMIs", cascade="delete, merge, save-update")
    balance = relationship("Balances", cascade="delete, merge, save-update")
    income = relationship("Incomes", cascade="delete, merge, save-update")
    saving = relationship("Savings", cascade="delete, merge, save-update")


    def __init__(self,first_name,last_name,gender, email, user_name, password)->None:
        self.first_name = first_name
        self.last_name = last_name
        self.gender = gender
        self.email = email
        self.user_name = user_name
        self.password = password

    def __repr__(self)->str:
        return f"Users(name = '{self.user_name}')"


