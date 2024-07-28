import { useState } from "react"
import { validateFormData } from "./ValidateFormData";
import { useNavigate  ,Link} from "react-router-dom";
export default function Login(){


const navigate=useNavigate();


    const[formData , setFormData]=useState({
        email : "",
        password :""
    })



    const handleChange = (event)=>{
        const {name, value}= event.target; // object destructuring
setFormData({...formData , [name]: value})
    }


    const handleSubmit= async(event)=>{
        event.preventDefault();
const regexes={
    email:/^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex for validating email addresses
    password :/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@_]{8,}$/
}

if(validateFormData(formData , regexes)){
    const url='http://127.0.0.1:5000/login';
try{
const response = await fetch(url,{
method :'POST',
    headers :{
        "Content-type":"application/json"

    },
    body:JSON.stringify(formData)
});

const message= await response.json();
alert (JSON.stringify(message))
if(response.ok){
    localStorage.setItem("token", message.access_token)
    //flask side : have to return a json {token : "" , role:""}
    alert("login successfull!!!!!!");
    alert("your role "+ message.role)
    navigate(message.role =="admin"? "/adminDashboard": "/userDashboard")



}else{
    // login mismatch case 
}




}catch(error){
alert("error occured while submitting form", e.message);
console.log()
}


}

    }


    return(<>
    <div className="login">
        <h3>Login :</h3>
        <form onSubmit={handleSubmit} >
<div>
    <label htmlFor="email">email :</label>
    <input id="email"  type="email" name="email" value={formData.email} onChange={handleChange}/>
</div>

<div>
<label htmlFor="password">password :</label>
    <input id="password"  type="password" name="password" value={formData.password} onChange={handleChange}/>
    
</div>
<input type="submit" />
        </form>
        <h4>New User ? <Link to="/register" >Click here</Link> </h4>
    </div>
    </>)
}