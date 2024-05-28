import { useStyles } from "./CategoriesCss";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import TitleComponent from "../../components/admin/TitleComponent";
import {
  Button,
  Grid,
  TextField,
  Avatar,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { getData, postData } from "../../services/FetchNodeServices";

export default function Banner(props) {
  var classes = useStyles();
  const [bannerType, setBannerType] = useState("");
  const [brand, setBrand] = useState("");
  const [picture, setPicture] = useState({
    file: [],
    bytes: "",
  });
  const [error, setError] = useState("");
  const handleError = (label, msg) => {
    setError((prev) => ({ ...prev, [label]: msg }));
  };
  //handle picture

  const handlePicture = async (event) => {
    //alert(JSON.stringify(event.target.files))
    console.log(event.target.files);

    if (Object.values(event.target.files).length <= 3) {
      alert("Pls Upload 3 or more files");
    } else {
      setPicture({
        file: Object.values(event.target.files),
        bytes: event.target.files,
      });
    }
  };

  //brand dd
  const [brandId, setBrandId] = useState("");
  const [brandList, setBrandList] = useState([]);

  const fetchAllBrands = async () => {
    var result = await getData("brand/display_all_brand");
    if (result.status) {
      setBrandList(result.data);
    }
  };
  const fillAllBrands = () => {
    return brandList.map((item) => {
      return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>;
    });
  };

  useEffect(function () {
    fetchAllBrands();
  }, []);

  //handle reset
  const handlereset = async () => {
    setBannerType("");
    setBrand("");
    setPicture({
      file: [],
      bytes: "",
    });
  };
  //handle submit

  const handleSubmit = async () => {
    var submit = true;
    if (bannerType.length == 0) {
      handleError("banner", "choose Banner type");
      submit = false;
    }
    if (brand.length == 0) {
      handleError("brand", "choose brand");
      submit = false;
    }
    if (picture.bytes.length == 0) {
      handleError("picture", "Please choose banners");
      submit = false;
    }
    if (!submit) {

      var formData = new FormData();
      formData.append("bannertype", bannerType);
      formData.append("brandid", brandId);
      picture.file.map((item, i) => {
        formData.append("picture" + i, item);
      });

      var result = await postData("banner/submit_banner", formData);
      // console.log(result);
      console.log(result.status);
      if (result.status) {
        Swal.fire({
          icon: "Success",
          title: result.msg,
          timer: 1000,
        });
      } else {
        Swal.fire({
          icon: "Error",
          title: result.msg,
          timer: 1500,
        });
      }
    } else {
      alert("EEEEEE", submit);
    }
  };

  const showImages = () => {
    return picture?.file?.map((item) => {
      return (
        <div style={{ margin: 2 }}>
          <Avatar
            alt="Remy Sharp"
            src={URL.createObjectURL(item)}
            variant="rounded"
          />
        </div>
      );
    });
  };
  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TitleComponent
              title="Add Banner"
              logo="logo.png"
              listicon="checklist.png"
              page="/admindashboard/displayallbanner"
            ></TitleComponent>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth style={{ marginTop: 10, marginBottom: 15 }}>
              <InputLabel>Banner Type</InputLabel>
              <Select
                value={bannerType}
                onChange={(event) => setBannerType(event.target.value)}
                label="Banner Type"
              >                <MenuItem value="general">General</MenuItem>
                <MenuItem value="trending">Trending</MenuItem>
                <MenuItem value="brand">Brand</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth style={{ marginTop: 10, marginBottom: 15 }}>
              <InputLabel>Choose Brand</InputLabel>
              <Select
                value={brandId}
                onChange={(event) => {
                  setBrandId(event.target.value);
                }}
                label="Choose Brand"
              >
                {bannerType === "brand" ? (
                  fillAllBrands()
                ) : (
                  <MenuItem value="0">None</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <Button variant="contained" component={"label"} fullWidth>
              Upload
              <input
                onClick={() => handleError("picture", null)}
                onChange={handlePicture}
                type="file"
                hidden
                accept="images/*"
                multiple
              ></input>
            </Button>
            {error.picture ? (
              <span
                style={{ fontFamily: "Kanit", color: "#d32f2f", fontSize: 13 }}
              >
                {error.picture}
              </span>
            ) : (
              <></>
            )}
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {showImages()}
          </Grid>

          <Grid item xs={6}>
            <Button variant="contained" fullWidth onClick={handlereset}>
              RESET
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button variant="contained" fullWidth onClick={handleSubmit}>
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
