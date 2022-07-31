import axios from 'axios';
import Joi, { alternatives } from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const [waiting, setWaiting] = useState(false);
  let[user,setUser]=useState({
    email:'',
    password:''
  })
  let[errorMsg,setErrorMsg]=useState('');
let[errorList,setErrorList]=useState([]);
const navigate=useNavigate();
function goToHome(){
  let path="/home";
  navigate(path);
}
  async function submetFormData(e){
    e.preventDefault();
    setWaiting(true);
    if(validateForm().error){
      setErrorList(validateForm().error.details);
      setWaiting(false);
    }
    else{
      let {data}=await axios.post("https://route-egypt-api.herokuapp.com/signin",user);
    if(data.message=='success'){
      localStorage.setItem("token",data.token);
      goToHome();
      setWaiting(false);
    }
    else{
      setErrorMsg(data.message)
      setWaiting(true);
    }
    }
    setWaiting(false)
  }
  function validateForm(){
    const schema=Joi.object({
      email:Joi.string().required().email({tlds:{allow:['com','net']}}),
      password:Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$'))
    })
    return schema.validate(user,{abortEarly:false});
  }
  function getFormValue(e){
    let myUser={...user};
    myUser[e.target.name]=e.target.value;
    setUser(myUser);
  }

  return (
    <div className="container my-5 py-5">
        <div className="col-md-5 m-auto text-center">
            <form onSubmit={submetFormData}>
            {errorMsg?<div className='alert alert-danger p-1'>{errorMsg}</div>:''}
            {errorList.map((error,index)=><div className='alert alert-danger p-1' key={index}>{error.message}</div>)}
                <div className="form-group mb-3">
                    <input onChange={getFormValue} placeholder="Enter email" name="email" type="email" className="form-control" />
                </div>
                <div className="form-group mb-3">
                    <input onChange={getFormValue} placeholder="confirm Password" name="password" type="password" className="form-control" />
                </div>
                <button type="submit" className="btn btn-info w-100">{waiting ? "Waiting....." : "SignIn"}</button>
            </form>
        </div>
    </div>

  )
}
