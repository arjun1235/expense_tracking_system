from sqlalchemy import Integer, Column, String, Date, ForeignKey, Float
from models import Base
from sqlalchemy.orm import relationship
class EMIs(Base):
    __tablename__ = 'emis'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    category_id = Column(Integer,ForeignKey('categories.id'))
    lender = Column(String(20), nullable=False)
    amount = Column(Float, nullable=False)
    interest_rate = Column(Float, nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date,nullable=False)
    user = relationship("Users")
    category = relationship("Categories")

    def __init__(self,user_id,category_id,lender,amount,interest_rate,start_date,end_date):
        self.user_id = user_id
        self.category_id = category_id
        self.amount = amount
        self.lender = lender
        self.interest_rate = interest_rate
        self.start_date = start_date
        self.end_date = end_date

    def __repr__(self):
        return f"EMIs( lender = {self.lender} user = {self.user_id})"
