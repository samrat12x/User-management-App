import os

class Config:
    SECRET_KEY = 'your_secret_key'
    # Add other configuration settings as needed
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'mysql+mysqlconnector://root:Remix%4012x@localhost/usermgmtapp')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
     
    JWT_SECRET_KEY = 'DONTdrinkANDdrive' 