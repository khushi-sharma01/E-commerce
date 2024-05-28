import { useState, useEffect } from "react";
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
import { useStyles } from "./CategoriesCss";
import { postData, getData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";

export default function SubCategory() {
  var classes = useStyles();

  const [error, setError] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [picture, setPicture] = useState({
    file: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/b84dd8103038865.5f446e8ad38fc.png",
    bytes: "",
  });

  const handleError = (label, msg) => {
    setError((prev) => ({ ...prev, [label]: msg }));
  };

  const fetchAllCategory = async () => {
    var result = await getData("category/display_all_category");
    if (result.status) {
      setCategoryList(result.data);
    }
  };
  useEffect(function () {
    fetchAllCategory();
  }, []);

  const handlePicture = (event) => {
    setPicture({
      file: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const fillAllCategory = () => {
    return categoryList.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };
  const handleSubmit = async () => {
    var submit = true;
    if (category.length == 0) {
      handleError("category", "please enter category id");
      submit = false;
    }
    if (subCategory.length == 0) {
      handleError("subCategory", "please enter subcategory");
      submit = false;
    }
    if (picture.bytes.length == 0) {
      handleError("picture", "select Sub Category icon");
      submit = false;
    }

    if (submit) {
      var formData = new FormData();
      formData.append("categoryid", category);
      formData.append("subcategoryname", subCategory);
      formData.append("picture", picture.bytes);

      var result = await postData("subCategory/submit_subCategory", formData);

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
    setCategory("");
    setSubCategory("");
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
              title={"Sub-Category"}
              logo={"logo.png"}
              listicon={"checklist.png"}
              page="displayallsubcategory"
            ></TitleComponent>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                label="Ctaegory"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {fillAllCategory()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={subCategory}
              error={error.subCategory}
              helperText={error.subCategory}
              onFocus={() => handleError("subCategory", null)}
              onChange={(event) => setSubCategory(event.target.value)}
              label="Sub-Category Name"
              fullWidth
              style={{ marginTop: 10, marginBottom: 15 }}
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
