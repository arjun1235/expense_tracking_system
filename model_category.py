from sqlalchemy import Integer, Column, String, Date, ForeignKey, Float
from main import Base

class Categories(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True)
    name = Column(String(20), unique=True)

    def __init__(self,id, name):
        self.id = id
        self.name = name

    def __repr__(self):
        return f"Categories(id = '{self.id}' name = '{self.name}')"

