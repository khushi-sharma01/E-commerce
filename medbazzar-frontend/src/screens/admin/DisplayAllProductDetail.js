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
import ProductDetail from "./ProductDetail";

export default function DisplayAllProductDetail(props) {
  var classes = useStyles();
  var navigate = useNavigate();

  const [showBtn, setShowBtn] = useState("");
  const [productDetailId, setProductDetailId] = useState("");
  const [open, setOpen] = useState(false);
  const [productSubName, setProductSubName] = useState("");
  const [weight, setWeight] = useState("");
  const [weightType, setWeightType] = useState("");
  const [type, setType] = useState("");
  const [packaging, setPackaging] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [offerType, setOfferType] = useState("");

  //for picture
  const [tempPicture, setTempPicture] = useState({files:[],bytes:[]});
  const [picture, setPicture] = useState({
    file: [],
    bytes: [],
  });
  const handlePicture = async (event) => {
    setShowBtn(true);
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

  //handle error

  const [error, setError] = useState({});
  const handleError = (label, msg) => {
    setError((prev) => ({ ...prev, [label]: msg }));
  };

  //product starts here

  const [productDetail, setProductDetail] = useState([]);

  const fetchAllProductDetail = async () => {
    var result = await getData("productdetail/display_products_detail");
    console.log(result.data);
    if (result.status) {
      setProductDetail(result.data);
    }
  };

  useEffect(function () {
    fetchAllProductDetail();
  }, []);

  //category stars here
  const [categoryId, setCategoryId] = useState("");
  const [categoryList, setCategoryList] = useState([]);

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
  useEffect(function () {
    fetchAllCategory();
  }, []);

  //subcategory

  const [subCategoryId, setSubCategoryId] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);

  const fetchAllSubCategory = async (cid) => {
    var result = await postData(
      "subCategory/fetch_all_subcategory_by_categoryid",
      {
        categoryid: cid,
      }
    );
    if (result.data) {
      setSubCategoryList(result.data);
    }
  };

  const fillAllSubCategory = () => {
    return subCategoryList.map((item) => {
      return (
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      );
    });
  };

  useEffect(function () {
    fetchAllSubCategory();
  }, []);

  //brands start here

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

  //product starts here

  const [productId, setProductId] = useState("");
  const [productList, setproductList] = useState([]);

  const fetchAllProducts = async (sid) => {
    var result = await postData("product/fetch_all_product_by_subcategoryid", {
      subcategoryid: sid,
    });
    if (result.status) {
      setproductList(result.data);
    }
  };
  const fillAllProducts = () => {
    return productList.map((item) => {
      return <MenuItem value={item.productid}>{item.productname}</MenuItem>;
    });
  };
  useEffect(function () {
    fetchAllProducts();
  }, []);

  const handleOpen = (rowData) => {
    setOpen(true);
    setProductDetailId(rowData.productdetailid);
    setCategoryId(rowData.categoryid);
    setSubCategoryId(rowData.subcategoryid);
    setBrandId(rowData.brandid);
    setProductId(rowData.productid);
    setProductSubName(rowData.productsubname);
    setWeight(rowData.weight);
    setWeightType(rowData.weighttype);
    setType(rowData.type);
    setPackaging(rowData.packaging);
    setQty(rowData.qty);
    setPrice(rowData.price);
    setOfferPrice(rowData.offerprice);
    setOfferType(rowData.offertype);
    setConcern(rowData.concernid);
    setPicture({
      files: [{ file: `${serverURL}/images/${rowData.picture}` }],
      bytes: [],
    });
    
    setTempPicture({
      files: [{ file: `${serverURL}/images/${rowData.picture}` }],
      bytes: [],
    });
    

    fetchAllSubCategory(rowData.categoryid);
    fetchAllProducts(rowData.subcategoryid);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (rowData) => {
    var body = { productdetailid: rowData.productdetailid };

    Swal.fire({
      title: "Do you want to Delete the product?",

      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var result = await postData(
          "productdetail/delete_product_detail",
          body
        );
        if (result.status) {
          Swal.fire("Deleted!", "", "success");
          fetchAllProductDetail();
        } else Swal.fire("failed to delete record !", "", "fail");
      } else if (result.isDenied) {
        Swal.fire("your product Data is safe", "", "info");
      }
    });
    fetchAllProductDetail();
  };

  //handleEdit product detail

  const handleEditDetail = async () => {
    var submit = true;
    if (productId.length == 0) {
      handleError("product", "please write product Name");
      submit = false;
    }

    if (submit) {
      var body = {
        categoryid: categoryId,
        subcategoryid: subCategoryId,
        brandid: brandId,
        productid: productId,
        productsubname: productSubName,

        weight: weight,
        weighttype: weightType,
        type: type,
        packaging: packaging,
        qty: qty,
        price: price,
        offerprice: offerPrice,
        offertype: offerType,
        productdetailid: productDetailId,
      };

      var result = await postData("productdetail/update_product_detail", body);
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
      fetchAllProductDetail();
    }
  };

  const handleEditPicture = async () => {
    var formData = new FormData();
    formData.append("productdetailid", productDetailId);
    picture.file.map((item, i) => {
      formData.append("picture" + i, item);
    });

    var result = await postData(
      "productdetail/update_product_picture",
      formData
    );
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
    fetchAllProductDetail();
  };

  const handleCancel = () => {
    setPicture({ file: tempPicture, bytes: "" });
    setShowBtn(false);
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

  //concern starts here
  const [concern,setConcern]=useState("");
  const[concernList, setConcernList]=useState([]);

  const fetchAllConcern=async()=>{
    var result =await getData('concern/fetchallconcern');
    if(result.status){
      setConcernList(result.data);
    }


  }
  const fillAllConcern=()=>{
  return concernList.map((item)=>{
    return <MenuItem value={item.concernid}>{item.concernname}</MenuItem>
   })
  }
  useEffect(function(){
    fetchAllConcern();
  },[])

  

  function showProductDetialForm() {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth={"lg"}>
        <DialogTitle>Edit product details</DialogTitle>
        <DialogContent>
          
            <div className={classes.boxEdit}>
              <Grid container spacing={3}>
               
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      label="Category"
                      value={categoryId}
                      onChange={(event) => {
                        setCategoryId(event.target.value);
                        fetchAllSubCategory(event.target.value);
                      }}
                    >
                      {fillAllCategory()}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel>Sub-category</InputLabel>
                    <Select
                      label="Sub-category"
                      value={subCategoryId}
                      onChange={(event) => {
                        setSubCategoryId(event.target.value);
                        fetchAllProducts(event.target.value);
                      }}
                    >
                      {fillAllSubCategory()}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel>Brands</InputLabel>
                    <Select
                      label="Brands"
                      value={brandId}
                      onChange={(event) => {
                        setBrandId(event.target.value);
                      }}
                    >
                      {fillAllBrands()}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel>Product</InputLabel>
                    <Select
                      label="Product"
                      value={productId}
                      onChange={(event) => {
                        setProductId(event.target.value);
                      }}
                    >
                      {fillAllProducts()}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    value={productSubName}
                    error={error.productSubName}
                    helperText={error.productSubName}
                    onFocus={() => handleError("productSubName", null)}
                    onChange={(event) => setProductSubName(event.target.value)}
                    label="Product Sub-Name"
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 15 }}
                  ></TextField>
                </Grid>
                <Grid item xs={3}>
                <FormControl fullWidth  style={{ marginTop: 10, marginBottom: 15 }} >
                    <InputLabel>Concern</InputLabel>
                    <Select
                      label="Concern"
                      value={concern}
                      onChange={(event) => {
                        setConcern(event.target.value);
                      
                      }}
                    >
                      {fillAllConcern()}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    value={weight}
                    error={error.weight}
                    helperText={error.weight}
                    onFocus={() => handleError("weight", null)}
                    onChange={(event) => setWeight(event.target.value)}
                    label="weight"
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 15 }}
                  ></TextField>
                </Grid>
                <Grid item xs={3}>
                  <FormControl
                    fullWidth
                    style={{ marginTop: 10, marginBottom: 15 }}
                  >
                    <InputLabel>Weight Type</InputLabel>
                    <Select
                      value={weightType}
                      onChange={(event) => setWeightType(event.target.value)}
                      label="Weight Type"
                    >
                      <MenuItem value="kg">kg</MenuItem>
                      <MenuItem value="mg">mg</MenuItem>
                      <MenuItem value="mg">ml</MenuItem>
                      <MenuItem value="mg">L</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={type}
                      onChange={(event) => setType(event.target.value)}
                      label="Type"
                    >
                      <MenuItem value="syrup">Syrup</MenuItem>
                      <MenuItem value="powder">Powder</MenuItem>
                      <MenuItem value="tablet">Tablet</MenuItem>
                      <MenuItem value="capsule">Capsule</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Packaging</InputLabel>
                    <Select
                      value={packaging}
                      onChange={(event) => setPackaging(event.target.value)}
                      label="Packaging"
                    >
                      <MenuItem value="kg">xl</MenuItem>
                      <MenuItem value="mg">xxl</MenuItem>
                      <MenuItem value="mg">xxxl</MenuItem>
                      <MenuItem value="mg">xxxxl</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    value={qty}
                    error={error.qty}
                    helperText={error.qty}
                    onFocus={() => handleError("qty", null)}
                    onChange={(event) => setQty(event.target.value)}
                    label="Quantity"
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    value={price}
                    error={error.price}
                    helperText={error.price}
                    onFocus={() => handleError("price", null)}
                    onChange={(event) => setPrice(event.target.value)}
                    label="price"
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    value={offerPrice}
                    error={error.offerPrice}
                    helperText={error.offerPrice}
                    onFocus={() => handleError("offerPrice", null)}
                    onChange={(event) => setOfferPrice(event.target.value)}
                    label="Offer Price"
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Offer Type</InputLabel>
                    <Select
                      value={offerType}
                      onChange={(event) => setOfferType(event.target.value)}
                      label="offer Type"
                    >
                      <MenuItem value="mo">xl</MenuItem>
                      <MenuItem value="mg">xxl</MenuItem>
                      <MenuItem value="mg">xxxl</MenuItem>
                      <MenuItem value="mg">xxxxl</MenuItem>
                    </Select>
                  </FormControl>
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
                        <Button
                          variant="contained"
                          component={"label"}
                          fullWidth
                        >
                          Edit Pictures
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
                <Grid
            item
            xs={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {showImages()}
          </Grid>
              </Grid>
            
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDetail}>Edit Data</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  function showProductDetial() {
    return (
      <MaterialTable
        title="Product Details"
        columns={[
          { title: "Product detail ID", field: "productdetailid" },
          {
            title: "Category ",
            render: (rowData) => (
              <div>
                <div>{rowData.categoryname}</div>
                <div>{rowData.subcategoryname}</div>
              </div>
            ),
          },
          {
            title: "Concern",
            render: (rowData) => (
              <div>
                {rowData.concernname }
              </div>
            ),
          },
          
          {
            title: "Brand",
            render: (rowData) => (
              <div>
                <div>{rowData.brandname}</div>
                <div>
                  {rowData.productname} {rowData.productsubname}{" "}
                  {rowData.weight}
                  {rowData.weighttype}
                </div>
              </div>
            ),
          },

          {
            title: "Product-Type",
            render: (rowData) => (
              <div>
                <div>{rowData.qty}</div>
                <div>{rowData.type}</div>
                <div>{rowData.packaging}</div>
              </div>
            ),
          },

          {
            title: "price",
            render: (rowData) => (
              <div>
                <s>
                  <div>&#8377;{rowData.price}</div>
                </s>
                <div>&#8377;{rowData.offerprice}</div>
              </div>
            ),
          },

          { title: "Offer-Type", field: "offertype" },

          {
            title: "Icon",
            field: "picture",
            render: (rowData) => (
              <img
                src={`${serverURL}/images/${rowData.picture.split(",")[0]}`}
                alt="Category Icon"
                style={{ width: 60, height: 60, borderRadius: 30 }}
              />
            ),
          },
        ]}
        data={productDetail}
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
            onClick: (event) => navigate("/admindashboard/productdetails"),
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
      <div className={classes.boxDisplayproductdetail}>
        {showProductDetial()}
      </div>
      {showProductDetialForm()}
    </div>
  );
}
