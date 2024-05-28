import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField, Avatar } from "@mui/material";
import verifyOTP from "./verifyOTP";
import { postData } from "../../services/FetchNodeServices";
import LoginDetails from "./LoginDetails";
import VerifyOTP from "./verifyOTP";
import { useDispatch } from "react-redux";
const GetOTP = (props) => {
  const navigate = useNavigate();
  const [status,setStatus]=useState(true)
  var [mobileno, setMobileno] = useState("");
  const [otp,setOtp]=useState(0)
  const [userStatus,setUserStatus]=useState(false)
  const generateOTP = () => {
    var myotp=parseInt(Math.random()*8999)+1000
  alert(myotp)
  setOtp(myotp)
  };
  var dispatch=useDispatch()
  const handleOTP = async () => {
    var result = await postData("users/check_userdata", { mobileno: mobileno });
    if(result.status==false)
    { generateOTP()
      setStatus(!status)
      setUserStatus(false)
    }
    else
    {generateOTP()
      setStatus(!status)
     setUserStatus(true)
     dispatch({type:'ADD_USER',payload:[mobileno,result.data]})
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >{status?
      <Paper
        square={false}
        elevation={24}
        style={{
          width: 400,
          height: 500,
          borderRadius: 30,
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontfamily: "Kanit",
            fontSize: 30,
            fontWeight: "bold",
            marginTop: 18,
            marginLeft: -45,
          }}
        >
          Welcome to
        </div>
        <div style={{ fontfamily: "Kanit", fontSize: 40, fontWeight: "bold" }}>
          MedBaZZar
        </div>
        <Grid style={{ display: "flex", marginTop: 20 }}>
          <TextField
            borderRadius="30"
            onChange={(e) => setMobileno(e.target.value)}
            value={mobileno}
            placeholder="Enter your Mobile Number"
          ></TextField>
        </Grid>
        <Button
          onClick={handleOTP}
          variant="contained"
          style={{ width: "58%", marginTop: 10, background: "#0e1f45" }}
        >
          Get OTP
        </Button>
        <div style={{ fontFamily: "kanit", fontSize: 13, marginTop: 10 }}>
          Verify By continuing, you agree to our <br />
          Terms of Service and Privacy & Legal Policy
        </div>
        </Paper>:userStatus?<VerifyOTP mobileno={mobileno} otp={otp}/>:<LoginDetails mobileno={mobileno} otp={otp}/>}
     </div>
  );
};

export default GetOTP;
