import React from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Updatepost from './components/Updatepost'
import Createpost from './components/Createpost'
import UpdatePassword from './components/UpdatePassword'
import { BrowserRouter,Routes,Route} from 'react-router-dom'


const App=()=>{
  return (
    <>
      <BrowserRouter>       
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/register' element={<Register />}></Route>
          <Route exact path='/update' element={<Updatepost />}></Route>
          <Route exact path='/create' element={<Createpost />}></Route>
          <Route exact path='/updatePass' element={<UpdatePassword />}></Route>
        </Routes>
      </BrowserRouter> 
    </>           
  )
}

export default App;