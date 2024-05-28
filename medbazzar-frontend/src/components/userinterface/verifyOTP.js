import React from "react";
import { useState } from "react";
import OtpInput from "react-otp-input";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Input, Paper, TextField } from "@mui/material";
export default function VerifyOTP(props) {
  var navigate = useNavigate();
  var [mobileno, setMobileno] = useState("");
  const [otp, setOtp] = React.useState("");
  const handleverify=()=>{
    if(otp==props.otp){
      navigate('/carts')
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You are logged in now...",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
    }
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
              marginLeft: 18,
            }}
          >
            Verify OTP
          </div>
          <div
            style={{
              fontfamily: "Kanit",
              fontSize: 13,
              marginLeft: 18,
              color: "grey",
            }}
          >
            An SMS with 6-digit OTP was sent to
            <br /> {props.mobileno} <div style={{ color: "blue" }}>Change</div>
          </div>
          <Grid style={{ display: "flex", marginTop: 20, marginLeft: 16 }}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={{ width: 35, height: 40 }}
            />
          </Grid>
          <Button
            variant="contained"
            style={{
              width: "58%",
              marginLeft: 16,
              marginTop: 10,
              background: "#0e1f45",
            }}
            onClick={handleverify()}
          >
            Verify OTP
          </Button>
          <div
            style={{
              fontFamily: "kanit",
              fontSize: 13,
              marginLeft: 16,
              marginTop: 10,
            }}
          >
            Verify By continuing, you agree to our <br />
            Terms of Service and Privacy & Legal Policy
          </div>
        </Paper>
      </div>
    </div>
  );
}
