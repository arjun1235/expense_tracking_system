from sqlalchemy import Integer, Column, String, Date, ForeignKey, Float
from models import Base
from sqlalchemy.orm import relationship

class Savings(Base):
    __tablename__= 'savings'
    id = Column(Integer,primary_key=True)
    user_id = Column(Integer,ForeignKey('users.id'))
    amount = Column(Float, nullable=False)
    user = relationship("Users")

    def __init__(self,user_id,amount):
        self.user_id = user_id
        self.amount = amount

    def __repr__(self):
        return f"savings(user id = '{self.user_id}')"
