from sqlalchemy import Integer, Column, String, Date, ForeignKey, Float
from main import Base

class Expense(Base):
    __tablename__ = 'expense'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer,ForeignKey('users.id'))
    category_id  = Column(Integer,ForeignKey('categories.id'))
    amount = Column(Float,nullable=False)
    description = Column(String(50))
    date = Column(Date,nullable=False)

    def __init__(self,id,user_id,category_id,amount,description,date):
        self.id = id
        self.category_id = category_id
        self.amount = amount
        self.description = description
        self.date = date

    def __repr__(self):
        return f"(id = '{self.id}' category = '{self.category_id}')"

