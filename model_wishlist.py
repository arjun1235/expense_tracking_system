from sqlalchemy import Integer, Column, String, Date, ForeignKey, Float
from main import Base

class Wishlist(Base):
    __tablename__ = 'wishlist'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    item_name = Column(String(20),nullable=False)
    estimated_cost = Column(Float, nullable=False)
    status = Column(String(20), nullable=False)

    def __init__(self,id, user_id,item_name,estimated_cost,status):
        self.id = id
        self.user_id = user_id
        self.item_name = item_name
        self.estimated_cost = estimated_cost
        self.status = status

    def __repr__(self):
        return f"Wishlist(id = '{self.id}' item_name = '{self.item_name}')"
