from sqlalchemy import Integer, Column, String, Date, ForeignKey, Float
from main import Base

class EMIs(Base):
    __tablename__ = 'emis'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    lender = Column(String(20), nullable=False)
    amount = Column(Float, nullable=False)
    interest_rate = Column(Float, nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date,nullable=False)

    def __init__(self,id,user_id,lender,amount,interest_rate,start_date,end_date):
        self.id =id
        self.user_id = user_id
        self.amount = amount
        self.lender = lender
        self.interest_rate = interest_rate
        self.start_date = start_date
        self.end_date = end_date

    def __repr__(self):
        return f"EMIs(id = {self.id} lender = {self.lender} user = {self.user_id})"
