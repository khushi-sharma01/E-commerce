import { useStyles } from "./CategoriesCss";
import { useState } from "react";
import Swal from "sweetalert2";
import { Button, Grid, TextField, Avatar } from "@mui/material";
import TitleComponent from "../../components/admin/TitleComponent";

import { postData } from "../../services/FetchNodeServices";
export default function Brands(props) {
  var classes = useStyles();
  const [error, setError] = useState("");
  const [brand, setBrand] = useState("");
  const [picture, setPicture] = useState({
    file: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/b84dd8103038865.5f446e8ad38fc.png",
    bytes: "",
  });

  const handlePicture = (event) => {
    setPicture({
      file: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const handleError = (label, msg) => {
    setError((prev) => ({ ...prev, [label]: msg }));
  };

  const handleSubmit = async () => {
    var submit = true;
    if (brand.length == 0) {
      handleError("brand", "Enter brand name");
      submit = false;
    }
    if (picture.bytes.length == 0) {
      handleError("picture", "select brand icon");
      submit = false;
    }
    if (submit) {
      var formData = new FormData();
      formData.append("brandname", brand);
      formData.append("picture", picture.bytes);

      var result = await postData("brand/submit_brand", formData);

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
    }
  };
  const handleReset = async () => {
    setBrand("");
    setPicture({
      file: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/b84dd8103038865.5f446e8ad38fc.png",
      bytes: "",
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TitleComponent
              title={"Brands"}
              logo={"logo.png"}
              listicon={"checklist.png"}
              page="/display_all_brands"
            ></TitleComponent>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={brand}
              error={error.brand}
              helperText={error.brand}
              onFocus={() => handleError("brand", null)}
              onChange={(event) => setBrand(event.target.value)}
              label="Brand Name"
              fullWidth
              style={{ marginTop: 15, marginBottom: 15 }}
            ></TextField>
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
          <Grid item xs={6}>
            <Avatar
              alt="Remy sharp"
              src={picture.file}
              variant="rounded"
            ></Avatar>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" fullWidth onClick={handleReset}>
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
