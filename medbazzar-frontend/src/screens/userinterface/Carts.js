import Header from "../../components/userinterface/Header";
import PaymentDetails from "../../components/userinterface/PaymentDetails";
import ShowCart from "../../components/userinterface/ShowCart";
import DeliveryAddress from "../../components/userinterface/DeliveryAddress"
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { postData } from "../../services/FetchNodeServices";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import AddAddress from "../../components/userinterface/AddAdress";
import { Container } from "@mui/material/Container";

import { useState } from "react";
export default function Carts() {
  var [pageRefresh, setPageRefresh] = useState(false);
  const [status, setStatus] = useState(false);
  const [userAddress, setUserAddress] = useState([]);

  var products = useSelector((state) => state.data);
  var user = useSelector((state) => state.user);
var userData = Object.values(user)[0];
console.log("USER DATAAAA:", userData);
  console.log("USER DATAAAA:", userData);
  const check_user_address = async () => {
    if (userData?.mobileno == undefined) {
      setStatus(false);
    } else {
      var result = await postData("users/check_user_address", {
        mobileno: userData?.mobileno,
      });
      if (result.status == false) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    }
  };
  useEffect(
    function () {
      check_user_address();
    },
    [userData?.mobileno]
  );

  return (
    <div>
      <Header />

      <Grid
        container
        spacing={2}
        style={{
          padding: 30,

          marginTop: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} md={8} style={{ padding: 30 }}>
        <div style={{margin:10,display:'flex'}} >
                    <DeliveryAddress status={status} setStatus={setStatus} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} userData={userData} userAddress={userAddress}/>
                    </div>
          <ShowCart
            pageRefresh={pageRefresh}
            setPageRefresh={setPageRefresh}
            products={products}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <PaymentDetails
            products={products}
            pageRefresh={pageRefresh}
            setPageRefresh={setPageRefresh}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AddAddress
            pageRefresh={pageRefresh}
            setPageRefresh={setPageRefresh}
            userData={userData}
            status={status}
            setStatus={setStatus}
          />
        </Grid>
      </Grid>
    </div>
  );
}
