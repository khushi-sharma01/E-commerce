import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField, Avatar } from "@mui/material";
import verifyOTP from "./verifyOTP";
import OtpInput from "react-otp-input";
import Swal from "sweetalert2";
import { postData } from "../../services/FetchNodeServices";
const LoginDetails = (props) => {
  var [mobileno, setMobileno] = useState("");
  const [otp, setOtp] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
 const navigate=useNavigate();
  const handleSubmit = async () => {
    if (props.otp == otp) {
      try {
        var body = {
          mobileno: props.mobileno,
          emailid: emailId,
          username: firstName + " " + lastName,
        };
        const result = await postData("users/submit_user", body);
        if (result && result.status) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You are registered now...",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
          });
          navigate('/carts')
        } else {
          alert("Failed to submit user data. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting user data:", error);
        alert(
          "An error occurred while submitting user data. Please try again later."
        );
      }
    } else {
      alert("Invalid OTP...");
    }
  };

  return (
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
          height: 600,
          borderRadius: 30,
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontfamily: "Kanit",
            fontSize: 30,
            fontWeight: "bold",
            marginLeft: 18,
          }}
        >
          Welcome to MedBazzar
        </div>
        <div
          style={{
            fontfamily: "Kanit",
            fontSize: 16,
            color: "grey",
            marginLeft: 18,
          }}
        >
          Please enter your details for a better shopping experience
        </div>
        <Grid
          container
          spacing={1}
          style={{ display: "flex", marginTop: 10, marginLeft: 16 }}
        >
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setFirstName(e.target.value)}
              required
              id="standard-required"
              label="First Name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setLastName(e.target.value)}
              required
              id="standard-required"
              label="Last Name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setEmailId(e.target.value)}
              required
              id="standard-required"
              label="Email ID"
              variant="standard"
            />
          </Grid>
         
        </Grid>

        <Grid
          container
          spacing={0}
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginTop: 10,
          }}
        >
          <Grid
            item
            xs={12}
            style={{
              fontfamily: "Kanit",
              fontSize: 25,
              fontWeight: "bold",
              marginTop: 18,
              textAlign: "center",
            }}
          >
            Verify OTP
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              fontfamily: "Kanit",
              fontSize: 13,
              color: "grey",
              textAlign: "center",
            }}
          >
            An SMS with 4-digit OTP was sent to
            <br /> {props.mobileno} <div style={{ color: "blue" }}>Change</div>
          </Grid>
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
            onClick={handleSubmit}
            variant="contained"
            style={{
              width: "58%",
              marginLeft: 16,
              marginTop: 10,
              background: "#0e1f45",
            }}
           
          >
            {" "}
            Get Started
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
        </Grid>
      </Paper>
    </div>
  );
};

export default LoginDetails;
