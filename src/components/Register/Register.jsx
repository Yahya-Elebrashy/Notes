import axios from 'axios';
import Joi, { alternatives } from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [waiting, setWaiting] = useState(false);
  let[user,setUser]=useState({
    first_name:'',
    last_name:'',
    email:'',
    password:''
})
let[errorMsg,setErrorMsg]=useState('');
let[errorList,setErrorList]=useState([]);
const navigate=useNavigate();
function goToHome(){
  let path="/Login";
  navigate(path);
}
  async function submetFormData(e){
    setWaiting(true);
    e.preventDefault();
    if(validateForm().error){
      setErrorList(validateForm().error.details);
      setWaiting(false);
    }
    else{
    let {data}=await axios.post("https://route-egypt-api.herokuapp.com/signup",user);
    if(data.message=='success'){
      goToHome();
      setWaiting(false);
    }
    else{
      setErrorMsg(data.message)
      setWaiting(false);
    }
    setWaiting(false)
  }
  }
  function validateForm(){
    const schema=Joi.object({

      first_name:Joi.string().alphanum().required().min(3).max(10),
      last_name:Joi.string().alphanum().required().min(3).max(10),
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
    <div class="container my-5 py-5">
        <div class="col-md-5 m-auto text-center">
            <form onSubmit={submetFormData}>
            {errorMsg?<div className='alert alert-danger p-1'>{errorMsg}</div>:''}
            {errorList.map((error,index)=><div className='alert alert-danger p-1' key={index}>{error.message}</div>)}
                <div class="form-group mb-3">
                    <input onChange={getFormValue} placeholder="Enter First Name" name="first_name" type="text" class=" form-control" />
                </div>
                <div class="form-group mb-3">
                    <input onChange={getFormValue} placeholder="Enter Last Name" name="last_name" type="text" class=" form-control" />
                </div>
                <div class="form-group mb-3">
                    <input onChange={getFormValue} placeholder="Enter email" type="email" name="email" class="form-control" />
                </div>
                <div class="form-group mb-3">
                    <input onChange={getFormValue} placeholder="Enter you password" type="password" name="password" class="form-control" />
                </div>
                <button type="submit" class="btn btn-info w-100">{waiting ? "Waiting....." : "SignUp"}</button>
            </form>
        </div>
    </div>
  )
}
