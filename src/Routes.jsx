import React from 'react'
// import { Route, Router, Routes } from 'react-router-dom'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import App from './App'
import Login from './Login'
import SignUp from './SignUp'

const Routers = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/form-validation' element={<App/>}/>
        </Routes>
    </Router>
  )
}

export default Routers
