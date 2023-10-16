from sqlalchemy import Integer, Column, String
from models import Base
from  sqlalchemy.orm import relationship
class Categories(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True)
    name = Column(String(20), unique=True)
    expense = relationship("Expense", cascade="delete, merge, save-update")
    wishlist = relationship("Wishlist", cascade="delete, merge, save-update")
    emis = relationship("EMIs", cascade="delete, merge, save-update")


    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"Categories(name = '{self.name}')"

