from sqlalchemy import Integer, Column, String, Date, ForeignKey, Float
from models import Base
from sqlalchemy.orm import relationship
class Incomes(Base):
    __tablename__ = 'income'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer,ForeignKey('users.id'))
    amount = Column(Float, nullable=False)
    description = Column(String(50))
    date = Column(Date)
    user = relationship("Users")

    def __init__(self,user_id,amount,description,date):
        self.user_id = user_id
        self.amount = amount
        self.description = description
        self.date = date

    def __repr__(self):
        return f"Base( amount = '{self.amount}')"
