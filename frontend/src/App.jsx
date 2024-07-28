import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import EntryPoint from './EntryPoint';
import Login from './Login'
import Register from './Register'
import AdminDashboard from './AdminDashboard'
import UserDashboard from './UserDashboard'
import './App.css'

function App() {


  return (
    <>
    <Router>

<div>
<Routes>

<Route path="/" element={<EntryPoint/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/adminDashboard' element={<AdminDashboard/>}/>
<Route path="/userDashboard" element={<UserDashboard/>}/>
</Routes>

</div>

    </Router>
     
    </>
  )
}

export default App
