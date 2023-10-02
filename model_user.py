from sqlalchemy import Integer, Column, String, Date, ForeignKey, Float
from main import Base
class Users(Base):
    __tablename__ = 'users'
    id = Column(Integer,primary_key=True)
    first_name = Column(String(20), nullable=False)
    middle_name = Column(String(20), nullable= True)
    last_name = Column(String(20), nullable= False)
    gender = Column(String(20), nullable=False)
    email = Column(String(20), nullable=True, unique=True)
    user_name = Column(String(20), nullable=False, unique=True)
    password = Column(String(20), nullable=False)

    def __init__(self,id,first_name, middle_name,last_name,gender, email, user_name, password)->None:
        self.id = id
        self.first_name = first_name
        self.middle_name = middle_name
        self.last_name = last_name
        self.gender = gender
        self.email = email
        self.user_name = user_name
        self.password = password

    def __repr__(self)->str:
        return f"Users(id = '{self.id}' name = '{self.user_name}')"


