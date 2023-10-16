from sqlalchemy import Integer, Column, String, Date, ForeignKey, Float
from models import Base
from sqlalchemy.orm import  relationship

class Balances(Base):
    __tablename__ = 'balances'
    user_id = Column(Integer, ForeignKey('users.id'),primary_key=True)
    amount = Column(Float, nullable=False)
    user = relationship("Users")

    def __init__(self, user_id,amount):
        self.user_id = user_id
        self.amount = amount

    def __repr__(self):
        return f"Balances(user = '{self.user_id}')"
