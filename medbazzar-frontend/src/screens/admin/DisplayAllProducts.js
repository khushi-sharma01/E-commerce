import MaterialTable from "@material-table/core";
import { useStyles } from "./CategoriesCss";
import { useEffect, useState } from "react";
import { serverURL, getData, postData } from "../../services/FetchNodeServices";
import TitleComponent from "../../components/admin/TitleComponent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Swal from "sweetalert2";
import DialogTitle from "@mui/material/DialogTitle";
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
import { useNavigate } from "react-router-dom";

export default function DisplayAllProducts() {
  var classes = useStyles();
  var navigate = useNavigate();

  const [subCategory, setSubCategory] = useState("");

  const [brand, setBrand] = useState("");
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [productId, setProductId] = useState("");
  const [error, setError] = useState({});
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tempPicture, setTempPicture] = useState("");
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState([]);
  const [showBtn, setShowBtn] = useState(false);
  const handleError = (label, msg) => {
    setError((prev) => ({ ...prev, [label]: msg }));
  };
  const [picture, setPicture] = useState({
    file: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/b84dd8103038865.5f446e8ad38fc.png",
    bytes: "",
  });

  const fetchAllProduct = async () => {
    var result = await getData("product/display_all_product");
    console.log(result.data);
    if (result.status) {
      setProductData(result.data);
    }
  };
  useEffect(function () {
    fetchAllProduct();
  }, []);

  const handleDelete = async (rowData) => {
    var body = { productid: rowData.productid };

    Swal.fire({
      title: "Do you want to Delete the product?",

      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var result = await postData("product/delete_product", body);
        if (result.status) {
          Swal.fire("Deleted!", "", "success");
          fetchAllProduct();
        } else Swal.fire("failed to delete record !", "", "success");
      } else if (result.isDenied) {
        Swal.fire("your product Data is safe", "", "info");
      }
    });
    fetchAllProduct();
  };

  const handleEditPicture = async () => {
    var formData = new FormData();
    formData.append("productid", productId);
    formData.append("picture", picture.bytes);

    var result = await postData("product/update_product_picture", formData);
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
    fetchAllProduct();
  };

  const handlePicture = (event) => {
    setPicture({
      file: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });

    setShowBtn(true);
  };

  const handleOpen = (rowData) => {
    setOpen(true);
    setCategory(rowData.categoryid);
    setProductId(rowData.productid);
    setProduct(rowData.productname);
    setBrand(rowData.brandid);
    setSubCategory(rowData.subcategoryid);
    setDescription(rowData.description);

    setPicture({ file: `${serverURL}/images/${rowData.picture}` });
    setTempPicture(`${serverURL}/images/${rowData.picture}`);

    {
      fetchAllCategory();
    }
    {
      fetchAllSubCategory(category);
    }
    {
      fetchAllBrands();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditData = async () => {
    var submit = true;
    if (product.length == 0) {
      handleError("product", "please write product Name");
      submit = false;
    }
    if (description.length == 0) {
      handleError("description", "please give product description");
    }

    if (submit) {
      var body = {
        categoryid: category,
        subcategoryid: subCategory,
        brandid: brand,
        productid: productId,
        productname: product,
        description: description,
      };

      var result = await postData("product/update_product_data", body);
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
      fetchAllProduct();
    }
  };

  const handleCancel = () => {
    setPicture({ file: tempPicture, bytes: "" });
    setShowBtn(false);
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
  useEffect(() => {
    if (category) {
      fetchAllSubCategory(category);
    }
  }, [category]);
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
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

  function showProductForm() {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth={"lg"}>
        <DialogTitle>Edit product</DialogTitle>
        <DialogContent>
          {" "}
          <div className={classes.box}>
            <Grid container spacing={3}>
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
                {showBtn ? (
                  <div
                    style={{
                      width: "100%",
                      height: 90,
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <Button variant="contained" onClick={handleEditPicture}>
                      Save
                    </Button>
                    <Button variant="contained" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        width: "100%",
                        height: 90,
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
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
                    </div>
                    {error.picture ? (
                      <span
                        style={{
                          fontFamily: "Kanit",
                          color: "#d32f2f",
                          fontSize: 13,
                        }}
                      >
                        {error.picture}
                      </span>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </Grid>
              <Grid item xs={6}>
                <Avatar
                  alt="Remy sharp"
                  src={picture.file}
                  variant="rounded"
                ></Avatar>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditData}>Edit Data</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  function showProduct() {
    return (
      <MaterialTable
        title="Product"
        columns={[
          { title: "Category ", field: "categoryname" },
          { title: "Sub-Category", field: "subcategoryname" },
          { title: "Brand", field: "brandname" },
          { title: "Product id", field: "productid" },
          { title: "Product Name", field: "productname" },
          { title: "Description", field: "description" },

          {
            title: "Icon",
            field: "picture",
            render: (rowData) => (
              <img
                src={`${serverURL}/images/${rowData.picture}`}
                alt="Category Icon"
                style={{ width: 60, height: 60, borderRadius: 30 }}
              />
            ),
          },
        ]}
        data={productData}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Product",
            onClick: (event, rowData) => handleOpen(rowData),
          },
          {
            icon: "delete",
            tooltip: "Delete Product",
            onClick: (event, rowData) => handleDelete(rowData),
          },
          {
            icon: "add",
            tooltip: "Add Product",
            isFreeAction: true,
            onClick: (event) => navigate("/admindashboard/products"),
          },
        ]}

        options={
          {
            paging:true,
            pageSize:3,
            emptyRowsWhenPaging:false,
            pageSizeOptions:[3,5,7,9]
          }
        }
      />
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.boxDisplayproductdetail}>{showProduct()}</div>
      {showProductForm()}
    </div>
  );
}
