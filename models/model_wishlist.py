from sqlalchemy import Integer, Column, String, ForeignKey, Float
from models import Base
from sqlalchemy.orm import relationship
class Wishlist(Base):
    __tablename__ = 'wishlist'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    categories_id = Column(Integer,ForeignKey('categories.id'))
    item_name = Column(String(20),nullable=False)
    estimated_cost = Column(Float, nullable=False)
    status = Column(String(20), nullable=False)
    priority = Column(Integer, nullable= False)
    source = Column(String(50),nullable=False)
    user = relationship("Users")
    categories = relationship("Categories")

    def __init__(self, user_id,categories_id,item_name,estimated_cost,status,priority,source):
        self.user_id = user_id
        self.categories_id = categories_id
        self.item_name = item_name
        self.estimated_cost = estimated_cost
        self.status = status
        self.priority = priority
        self.source = source

    def __repr__(self):
        return f"Wishlist(id = '{self.id}' item_name = '{self.item_name}')"
