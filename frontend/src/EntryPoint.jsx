import {useNavigate} from 'react-router-dom'
export default function EntryPoint(){

    const navigate = useNavigate();

    const handleRegisterCLick=()=>{
navigate("/register")
    }


    const handleLoginCLick=()=>{
        navigate("/login")
            }

    return (<>
     entry point 
    <button onClick={handleRegisterCLick} > Register </button>
    <button  onClick={handleLoginCLick}> Login </button>
    </>)
}