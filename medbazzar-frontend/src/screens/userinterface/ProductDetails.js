import { Grid } from "@mui/material";
import { useStyles } from "./CssProductDetails";
import ProductPicture from "../../components/userinterface/ProductPicture";
import ProductInformation from "../../components/userinterface/ProductInformation";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/userinterface/Header";
export default function ProductDetails() {
  var location = useLocation();
  var item = location?.state?.data;
  const [pageRefresh, setPageRefresh] = useState(false);
  return (
    <div>
      <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header></Header>
      </div>
      <Grid container spacing={1}>
        <Grid item xs={6} style={{ width: "50%" }}>
          <ProductPicture item={item} />
        </Grid>
        <Grid item xs={6} style={{ width: "50%" }}>
          <ProductInformation
            item={item}
            pageRefresh={pageRefresh}
            setPageRefresh={setPageRefresh}
          />
        </Grid>
      </Grid>
    </div>
  );
}
