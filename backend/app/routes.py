from flask import Blueprint ,request , jsonify
from .db import db ,User
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token

# Create a Blueprint instance for routing
bp = Blueprint('main', __name__)

# Define a route for the homepage
@bp.route('/')
def home():
    return "Hello, World!"

# You can add more routes here as needed
@bp.route('/userRegistration', methods=['POST'])
def submit_user_data():
    data = request.json

    #extract data
    name = data.get('name')
    email= data.get('email')
    dob=data.get('dob')
    phone=data.get('phone')
    password=data.get('password')
    role='user'
   #validate data
    if not name or not email or not dob or not phone or not password:
        return jsonify({"error": "missing fields"}),400
    
    #check if some the email or phone is already registered by a user

    #create new user instance , ie user object

    new_user= User(name=name , email=email , DOB=dob , phone=phone , password=password , role=role)

    new_user.set_password(password) 
    #add the new user to the session and commit to the db
    try:
     
     db.session.add(new_user)
     db.session.commit()
     print("try block executed")
     return jsonify({"message" :"user created in db"}),200
     
    
#Intergrity Error an exception class provided by SQL lib
    except  IntegrityError as e:
       print(e)
       #transaction rollback is necessary , if it had made any changes
       #db.session.rollback()

       #now lets analyse the error message
          #The attribute e.orig is specific to SQLAlchemy and contains the original error object from the underlying database driver, which is often a more detailed or lower-level error message.
          #str(e.orig): This converts the original error object to a string, making it easier to inspect and work with.
       error_msg= str(e.orig)
       if "Duplicate entry" in error_msg:
          if"email" in error_msg:
             return jsonify({"error" : "Email is already registered"}),400
          elif "phone" in error_msg:
             return jsonify({"error" : "phone  is already registered"}),400
        
        #apart from these cases
       return jsonify({"error" : "Database error"}), 500


@bp.route('/login', methods=['POST'])
def login():
   data=request.json
   email = data.get('email')
   password = data.get('password')

   #Check user credentials
   user = User.query.filter_by(email=email).first()  #fetches the first row where email== given one , but the unique constraint is applied on the email , so it doesnt matter  , returns None if user not found

   if user and user.check_password(password):
      access_token = create_access_token(identity=email)

      return jsonify({"access_token":access_token, "role":user.role}),200 # equivalent to {"access_token": access_token}

   return jsonify({"message": "Wrong username or password , try again"}) , 401



