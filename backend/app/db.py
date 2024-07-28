from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
db =SQLAlchemy()

class User(db.Model):

    __tablename__ = 'usertable'

    id=db.Column( db.Integer , primary_key=True , autoincrement=True)
    name=db.Column(db.String(45),nullable=True)
    email=db.Column(db.String(45),nullable=True, unique=True)
    DOB=db.Column(db.String(45), nullable=False)
    phone = db.Column(db.String(45), nullable=False)
    role = db.Column(db.String(45),nullable=False)
    password=db.Column(db.String(256),nullable=False)


    def set_password(self , password):
       self.password=generate_password_hash(password)

    def check_password(self , password):
       return check_password_hash(self.password , password)
    
    
    def __repr__(self):
     return f'<User {self.name}>'




    

