import React, { useState } from 'react'
import Layout from '../layout/Layout'
import LoginIcon from '@mui/icons-material/Login';
import { Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginData } from '../Services/Api';
import { useAuth } from '../Contex/Auth';
import Loading from '../Components/Loading';

const Login = () => {
  const navi=useNavigate()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
 const[auth,setAuth]=useAuth()
 const [loading,setLoading]=useState(false)
 const[error,setError]=useState({})

 const validation=()=>{
   const error={}
   if(!email){
     error.email='*@Email Cannot be empty'
   }
   if(!password){
     error.password='*@Password Cannot be empty'
   }
  
   return error
 }

  const loginHandel=async(e)=>{
    e.preventDefault()
    const errorList=validation()
    setError(validation())
    if(Object.keys(errorList).length===0){
      setLoading(true)
    try {
      const response=await loginData({email,password})
      console.log("data", response);
      if (response && response?.data?.status === 200) {
        setAuth({
          ...auth,
          user: response?.data?.user,
          token:response?.data?.token
        });
        setLoading(false)
        toast.success(response?.data?.message);
        localStorage.setItem("auth", JSON.stringify(response.data));
        navi("/Home");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast('Some server error')
    }
  }
  }
  
  if(loading){
    return <Loading/>
    }
  return (
    <>
    <Layout>
    <div className="container" style={{backgroundImage:'url("https://img.freepik.com/free-photo/flat-lay-workstation-with-copy-space-laptop_23-2148430879.jpg?w=1380&t=st=1710222825~exp=1710223425~hmac=5487f0594e556397b57125461411f0f52a9835ff56b1fd86e920c99797a0a8d2")',backgroundSize:'cover'}}>
        <div className="row mt-5">
          <div className="col mt-3">
          <div className='text-center mt-2 pt-5 shadow p-3 mb-4 bg-body rounded' style={{ width:'40%', minWidth:'300px' ,backgroundColor:'#f0f0f0' }} >
            <img src='https://cdn-icons-png.flaticon.com/512/295/295128.png' alt='Login' height='50px ' className='mb-4'/>
      <div>
        <label style={{fontSize:'30px',fontWeight:'bold'}}>Sign In</label><br/>
      <TextField label="*Email ID" variant="outlined" size='small' value={email} onChange={e=>setEmail(e.target.value)}/>
      <Typography variant="subtitle2" gutterBottom style={{color:'red'}}>{error.email}</Typography>
      </div>
      <div className='mt-4 mb-4'>
      <TextField  label="*Password" type='password' size='small' variant="outlined" value={password} onChange={e=>setPassword(e.target.value)} />
      <Typography variant="subtitle2" gutterBottom style={{color:'red'}}>{error.password}</Typography>
      </div>
      
  Do you have an account? <Link to={'/Register'}>Sign Up</Link>
      <Button variant="contained" size='medium' style={{marginTop:20, marginBottom:10,width:'60%'}} startIcon={<LoginIcon/>} color='error' onClick={loginHandel}>Login</Button>
      {/* <Button variant="contained" size='small' style={{marginTop:10,marginLeft:4,marginBottom:10}} startIcon={<HowToRegIcon/>} onClick={signuphandel}>Signup</Button> */}
      </div>
          </div>
        </div>
      </div>
    </Layout>
    </>
  )
}

export default Login