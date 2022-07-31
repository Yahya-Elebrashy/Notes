import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { Routes,Route, useNavigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Notfound from './components/Notfound/Notfound';



function App() {
  let [loginData,setLoginData]=useState(null);
  function setUserData(){
    let token=localStorage.getItem("token");
    let decoded=jwtDecode(token);
    setLoginData(decoded);
  }
  const navigation=useNavigate();
  function logOut(){
    localStorage.removeItem("token");
    setLoginData(null);
    navigation("/login");
  }
  useEffect(() => {
    if(localStorage.getItem("token")){
      setUserData();
    }
  },[]);
  return (
    <>
    <Navbar loginData={loginData} logOut={logOut}/>
    <Routes>
      <Route element={<ProtectedRoute/>}>
        <Route path='home' element={<Home/>}></Route>
        <Route path='*' element={<Notfound/>}></Route>
        <Route path='/' element={<Home/>}></Route>
      </Route>
      <Route path='login' element={<Login/>}></Route>
      <Route path='register' element={<Register/>}></Route>
    </Routes>
    

    </>
  );
}

export default App;
