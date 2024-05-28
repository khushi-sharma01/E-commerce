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
import SubCategory from "./subCategory";

export default function Products() {
  var classes = useStyles();

  const [error, setError] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [picture, setPicture] = useState({
    file: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/b84dd8103038865.5f446e8ad38fc.png",
    bytes: "",
  });

  const handleError = (label, msg) => {
    setError((prev) => ({ ...prev, [label]: msg }));
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

  const fetchAllCategory = async () => {
    var result = await getData("category/display_all_category");
    if (result.status) {
      setCategoryList(result.data);
    }
  };

  const fillAllCategory = () => {
    return categoryList.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  const fetchAllSubCategory = async (cid) => {
    var result = await postData(
      "subCategory/fetch_all_subcategory_by_categoryid",
      { categoryid: cid }
    );
    if (result.status) {
      setSubCategoryList(result.data);
    }
  };
  useEffect(function () {
    fetchAllSubCategory();
  }, []);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    fetchAllSubCategory(event.target.value);
  };

  const fillAllSubCategory = () => {
    return subCategoryList.map((item) => {
      return (
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      );
    });
  };
  const fetchAllBrands = async () => {
    var result = await getData("brand/display_all_brand");
    if (result.status) {
      setBrandList(result.data);
    }
  };
  useEffect(function () {
    fetchAllBrands();
  }, []);

  const fillAllBrands = () => {
    return brandList.map((item) => {
      return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>;
    });
  };

  const handleReset = async () => {
    setCategory("");
    setBrand("");
    setProduct("");
    setSubCategory("");
    setDescription("");
    setPicture({
      file: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/b84dd8103038865.5f446e8ad38fc.png",
      bytes: "",
    });
  };
  const handleSubmit = async () => {
    var submit = true;
    if (category.length == 0) {
      handleError("category", "please select category");
      submit = false;
    }
    if (subCategory.length == 0) {
      handleError("subCategory", "please select subcategory");
      submit = false;
    }
    if (brand.length == 0) {
      handleError("brand", "please select brand");
      submit = false;
    }
    if (product.length == 0) {
      handleError("product", "please write product Name");
      submit = false;
    }
    if (description.length == 0) {
      handleError("description", "please give product description");
    }
    if (picture.bytes.length == 0) {
      handleError("picture", "select Sub Category icon");
      submit = false;
    }

    if (submit) {
      var formData = new FormData();
      formData.append("categoryid", category);
      formData.append("subcategoryid", subCategory);
      formData.append("brandid", brand);
      formData.append("productname", product);
      formData.append("description", description);
      formData.append("picture", picture.bytes);

      var result = await postData("product/submit_product", formData);

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
              title={"Add Product"}
              logo={"logo.png"}
              listicon={"checklist.png"}
              page="/admindashboard/displayallproduct"
            ></TitleComponent>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={category}
                onChange={handleCategoryChange}
              >
                {fillAllCategory()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Sub-Category</InputLabel>
              <Select
                fullWidth
                label="Sub-Category"
                value={subCategory}
                error={error.subCategory}
                onChange={(event) => setSubCategory(event.target.value)}
              >
                {fillAllSubCategory()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Brands</InputLabel>
              <Select
                fullWidth
                label="Brand"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
              >
                {fillAllBrands()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={product}
              error={error.product}
              helperText={error.product}
              onFocus={() => handleError("product", null)}
              onChange={(event) => setProduct(event.target.value)}
              label="Product Name"
              fullWidth
              style={{ marginTop: 10, marginBottom: 15 }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Give Description"
              variant="filled"
              value={description}
              error={error.description}
              helperText={error.description}
              onFocus={() => handleError("description", null)}
              onChange={(event) => setDescription(event.target.value)}
            />
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
