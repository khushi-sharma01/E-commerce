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
import Swal from "sweetalert2";
import { useStyles } from "./ProductDetailCSS";
import { useEffect, useState } from "react";
import TitleComponent from "../../components/admin/TitleComponent";
import { getData, postData } from "../../services/FetchNodeServices";
import { makeStyles } from "@mui/styles/makeStyles";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ProductDetail(props) {
  var classes = useStyles();
  const [productSubName, setProductSubName] = useState("");
  const [weight, setWeight] = useState("");
  const [weightType, setWeightType] = useState("");
  const [type, setType] = useState("");
  const [packaging, setPackaging] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [offerType, setOfferType] = useState("");
  const [description, setDescription] = useState("");
  //for picture
  const [picture, setPicture] = useState({
    file: [],
    bytes: "",
  });
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

  //for errors
  const [error, setError] = useState("");
  const handleError = (label, msg) => {
    setError((prev) => ({ ...prev, [label]: msg }));
  };
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
  //sub-category starts here

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
  //submit

  const handleSubmit = async () => {
    var submit = true;
    if (categoryId.length == 0) {
      handleError("category", "please enter category id");
      submit = false;
    }
    if (subCategoryId.length == 0) {
      handleError("subCategory", "please enter subcategory");
      submit = false;
    }

    if (brandId.length == 0) {
      handleError("subCategory", "please enter subcategory");
      submit = false;
    }
    if (productSubName.length == 0) {
      handleError("subCategory", "please enter subcategory");
      submit = false;
    }
    if (weight.length == 0) {
      handleError("subCategory", "please enter subcategory");
      submit = false;
    }
    if (weightType.length == 0) {
      handleError("subCategory", "please enter subcategory");
      submit = false;
    }
    if (type.length == 0) {
      handleError("subCategory", "please enter subcategory");
      submit = false;
    }
    if (packaging.length == 0) {
      handleError("subCategory", "please enter subcategory");
      submit = false;
    }
    if (qty.length == 0) {
      handleError("subCategory", "please enter subcategory");
      submit = false;
    }
    if (price.length == 0) {
      handleError("subCategory", "please enter subcategory");
      submit = false;
    }
    if (offerPrice.length == 0) {
      handleError("subCategory", "please enter subcategory");
      submit = false;
    }
    if (offerType.length == 0) {
      handleError("subCategory", "please enter subcategory");
      submit = false;
    }
    if (picture.bytes.length == 0) {
      handleError("picture", "select Sub Category icon");
      submit = false;
    }

    if (submit) {
      var formData = new FormData();
      formData.append("categoryid", categoryId);
      formData.append("subcategoryid", subCategoryId);
      formData.append("brandid", brandId);
      formData.append("productid", productId);
      formData.append("productsubname", productSubName);
      formData.append("description", description);
      formData.append("weight", weight);
      formData.append("weighttype", weightType);

      formData.append("type", type);
      formData.append("packaging", packaging);
      formData.append("qty", qty);
      formData.append("price", price);
      formData.append("offerprice", offerPrice);
      formData.append("offertype", offerType);

      picture.file.map((item, i) => {
        formData.append("picture" + i, item);
      });
      formData.append("concernid",concern)

      var result = await postData("productdetail/submit", formData);
      if (result && result.status) {
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
              title={"Product Details"}
              logo={"logo.png"}
              listicon={"checklist.png"}
              page="/admindashboard/displayallproductdetail"
            ></TitleComponent>
          </Grid>
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
          <FormControl fullWidth         style={{ marginTop: 10, marginBottom: 15 }}>
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
            <FormControl fullWidth style={{ marginTop: 10, marginBottom: 15 }}>
              <InputLabel>Weight Type</InputLabel>
              <Select
                value={weightType}
                onChange={(event) => setWeightType(event.target.value)}
                label="Weight Type"
              >
                <MenuItem value="kg">kg</MenuItem>
                <MenuItem value="mg">mg</MenuItem>
                <MenuItem value="g">gram</MenuItem>
                <MenuItem value="mg">ml</MenuItem>
                <MenuItem value="mg">L</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <ReactQuill
              style={{ color: "black" }}
              theme="snow"
              value={description}
              onChange={(e) => {
                setDescription(e);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={type}
                onChange={(event) => setType(event.target.value)}
                label="Type"
                
              > <MenuItem value="bar">Bar</MenuItem>
                <MenuItem value="syrup">Syrup</MenuItem>
                <MenuItem value="powder">Powder</MenuItem>
                <MenuItem value="tablet">Tablet</MenuItem>
                <MenuItem value="capsule">Capsule</MenuItem>
                <MenuItem value="gel">gel</MenuItem>
                <MenuItem value="lotion">Lotion</MenuItem>
                <MenuItem value="cream">Cream</MenuItem>
                
                <MenuItem value="other">Other</MenuItem>
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
                <MenuItem value="strip">strip</MenuItem>
                <MenuItem value="bottle">bottle</MenuItem>
                <MenuItem value="packet">packet</MenuItem>
                <MenuItem value="other">other</MenuItem>
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
                <MenuItem value="month_end_sale">Month End Sale</MenuItem>
                <MenuItem value="diwali_dhamaka">Diwali Dhamaka</MenuItem>
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
            <Button variant="contained" fullWidth onClick>
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
