from sqlalchemy import Integer, Column, String, Date, ForeignKey, Float
from main import Base

class Incomes(Base):
    __tablename__ = 'income'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer,ForeignKey('users.id'))
    amount = Column(Float, nullable=False)
    description = Column(String(50))
    date = Column(Date)

    def __init__(self,id,user_id,amount,description,date):
        self.id = id
        self.user_id = user_id
        self.amount = amount
        self.description = description
        self.date = date

    def __repr__(self):
        return f"Base(id = '{self.id}' amount = '{self.amount}')"
