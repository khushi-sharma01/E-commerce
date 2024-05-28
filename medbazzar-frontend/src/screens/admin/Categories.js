import { useState } from "react";
import TitleComponent from "../../components/admin/TitleComponent";
import { Button, Grid, TextField, Avatar } from "@mui/material";
import { useStyles } from "./CategoriesCss";
import { postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";

export default function Categories(props) {
  var classes = useStyles();

  const [category, setCategory] = useState("");
  const [error, setError] = useState({});
  const handlePicture = (event) => {
    setPicture({
      file: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };
  const [picture, setPicture] = useState({
    file: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/b84dd8103038865.5f446e8ad38fc.png",
    bytes: "",
  });

  const handleReset = () => {
    setCategory("");
    setPicture({
      file: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/b84dd8103038865.5f446e8ad38fc.png",
      bytes: "",
    });
  };

  const handleError = (label, msg) => {
    setError((prev) => ({ ...prev, [label]: msg }));
  };
  const handleSubmit = async () => {
    var submit = true;
    if (category.length == 0) {
      handleError("category", "write category name first");
      submit = false;
    }
    if (picture.bytes.length == 0) {
      handleError("picture", "Please choose icon");
      submit = false;
    }
    if (submit) {
      var formData = new FormData();
      formData.append("categoryname", category);
      formData.append("picture", picture.bytes);

      var result = await postData("category/submit_category", formData);
      // console.log(result);
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

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TitleComponent
              title="ADD CATEGORY"
              logo="logo.png"
              listicon="checklist.png"
              page="/admindashboard/displayallcategory"
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              value={category}
              error={error.category}
              helperText={error.category}
              onFocus={() => handleError("category", null)}
              onChange={(event) => setCategory(event.target.value)}
              label="Category name"
              fullWidth
              style={{ margin: 10 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" component="label" fullWidth>
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
            <Avatar alt="Remy Sharp" src={picture.file} variant="rounded" />
          </Grid>

          <Grid item xs={6}>
            <Button onClick={handleSubmit} variant="contained" fullWidth>
              SUBMIT
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleReset} variant="contained" fullWidth>
              RESET
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
