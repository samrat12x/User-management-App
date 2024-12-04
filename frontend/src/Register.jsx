import { useState } from "react"
import {useNavigate ,Link} from 'react-router-dom'
import { validateFormData } from "./ValidateFormData";
import "./Register.css"
export default function Register(){


    const [formData , setFormData]= useState({

name:"",
phone :"",
email:"" ,
dob: "",
password:"",
})


const navigate = useNavigate();




const regexes={
    name:/^[a-zA-Z\s]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex for validating email addresses
    phone : /^\d{10}$/, 
    password :/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@_]{8,}$/
} 




const handleSubmit= async (event)=>{
    event.preventDefault();
if(validateFormData(formData, regexes)){
//if validation function returns true , then only we proceed
//also validation function convey the Validation error to the user
//so no need to create the else part here
    try{
        //making post request to the backend server
const response =await fetch("http://127.0.0.1:5000/userRegistration",{
  method : 'POST',
  headers:{
    "Content-type":"application/json"
  }  ,
 body:JSON.stringify(formData)

})
//on the backend side if they sent me a string then 
       // alert(await response.text()) when response was string  , also why await , cuz its a asynchronous operation


       //when response is json

       //parsing the json
const message = await response.json();
//now you can read the json 



//HTTP Errors: Handled by checking response.ok and response.status within the try block.


if(response.ok){
    // response.ok is a property of the Response object in the Fetch API that returns a Boolean value indicating whether the HTTP status code of the response falls within the range of 200-299 (inclusive). If the status code is in this range, it means the request was successful, and response.ok will return a boolean  true. Otherwise, it will be false.
// when status code is in range 200-299
alert("you have been successfully registered , now login ")

setFormData({

    name:"",
    phone :"",
    email:"" ,
    dob: "",
    password:"",
    })
//clean the form data , before going out

navigate("/login")


}else if (response.status === 400  || response.status ===500){
   //since json was like this {"error" : "phone  is already registered"}
alert(message.error)  
console.log(message.error)
}

       
    }catch(e){
// only handles network error: like connection problems & dns probs etc
alert("An error occurred while submitting the form");
      console.error(e.message);   
}
}



}









const handleChange=(ev)=>{
const {name , value}=ev.target;
//object destructuring
setFormData({...formData , [name]: value})

}


  return(<> <div className="form">
    <h1>REGISTER YOURSELF</h1>
    <form onSubmit={handleSubmit}>
<div>
    <label htmlFor="name"> Name:</label>
    <input type="text" 
    id="name"
    name="name"
    value={formData.name}
    onChange={handleChange}
    required

/>
</div>
<div>
    <label htmlFor="email"> Email:</label>
    <input type="text" 
    id="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    required

/>
</div>
<div>
    <label htmlFor="phone"> phone:</label>
    <input type="text" 
    id="phone"
    name="phone"
    value={formData.phone}
    onChange={handleChange}
    required

/>
</div>
<div>
    <label htmlFor="dob"> DOB:</label>
    <input type="date" 
    id="dob"
    name="dob"
    value={formData.dob}
    onChange={handleChange}
    required

/>
</div>
<div>
    <label htmlFor="password"> Password</label>
    <input type="password" 
    id="password"
    name="password"
    value={formData.password}
    onChange={handleChange}
    required

/>
</div>

<input type="submit"/> 
    </form>
    <h3>password Rules</h3>
 <p   className="passRules">
    
 
At least one letter (a-z or A-Z). <br></br>
At least one digit (0-9). <br></br>
At least one  special charector ('@' or '_').
At least 8 characters long.<br></br>
Only allows letters, digits, @, and _—excluding other special characters and spaces.
 </p>
 
<h4>Already registered? <Link to="/login">click here</Link></h4>

    </div>
    </>)
}