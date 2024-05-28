import React from 'react'
import GetOTP from '../../components/userinterface/GetOTP'
import { Grid } from '@mui/material'
import Header from "../../components/userinterface/Header"
import MenuBar from "../../components/userinterface/MenuBar"
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import VerifyOTP from '../../components/userinterface/verifyOTP'
import { useState } from 'react'

import LoginDetails from '../../components/userinterface/LoginDetails'
const Login = () => {
  const [otp,setOtp]=useState(true)
  var [change,setChange]=useState(false)
  const theme =useTheme();
  const matchs =useMediaQuery(theme.breakpoints.down('md'));
  return (
    <div>
      <div style={{position:"sticky",top:0, zIndex:1000}}>
<Header ></Header>
</div>
<MenuBar/>
 <Grid container space={3} style={{display:'flex', justifyContent:'center', alignContent:'center',marginTop:29,margin:30}}>
  <Grid item  md={6}>
    {!matchs?(<div ><img src='login.png'></img></div>):(<div></div>)}
  
  </Grid>
  <Grid item xs={12} md={3} style={{}} >
   <GetOTP/>
   

  </Grid>

 </Grid></div>
  )
}

export default Login
