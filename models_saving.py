from sqlalchemy import Integer, Column, String, Date, ForeignKey, Float
from main import Base

class Savings(Base):
    __tablename__ = 'savings'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    amount = Column(Float, nullable=False)
    description = Column(String(20))
    date = Column(Date, nullable=False)

    def __init__(self,id, user_id,amount,description,date):
        self.id = id
        self.user_id = user_id
        self.amount = amount
        self.description = description
        self.date = date

    def __repr__(self):
        return f"Savings(id = '{self.id}' user = '{self.user_id}')"
