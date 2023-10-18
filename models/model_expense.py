from sqlalchemy import Integer, Column, String, Date, ForeignKey, Float
from models import Base
from sqlalchemy.orm import relationship
class Expense(Base):
    __tablename__ = 'expense'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer,ForeignKey('users.id'))
    category_id  = Column(Integer,ForeignKey('categories.id'))
    amount = Column(Float,nullable=False)
    description = Column(String(50))
    date = Column(Date,nullable=False)
    user = relationship("Users")
    category = relationship("Categories")

    def __init__(self,user_id,category_id,amount,description,date):
        self.user_id = user_id
        self.category_id = category_id
        self.amount = amount
        self.description = description
        self.date = date

    def __repr__(self):
        return f"( category = '{self.category_id}')"

