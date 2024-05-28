import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Slider from "react-slick";
import { Grid, Paper, Button, Typography, Divider } from "@mui/material";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Stack from "@mui/material/Stack";
import { serverURL } from "../../services/FetchNodeServices";
import { createRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useTheme } from "@mui/material/styles";
import PlusMinusComponent from "./PlusMinusComponent";
import { useSelector, useDispatch } from "react-redux";
import { Skeleton } from "@mui/material";
import { useNavigate } from 'react-router-dom';
export default function ProductCardComponent(props) {
  var sld = createRef();
  var navigate=useNavigate()
  var dispatch =useDispatch()
  var productFromRedux=useSelector(state=>state.data)
  var productRedux=Object.values(productFromRedux)
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  var settings = {
    dots: false,
    Infinity:false,
    speed: 500,
    slidesToShow:matchesMD?3: 5,
    slidesToScroll: 1,
  };

  const showProductCardSlideShimmer = () => {
    return ["", "", "", "", "", "", ""]?.map((item) => {
      return (
        <div>
          <Skeleton height={450} width={250} animation="wave">
            <div
              style={{
                display: "flex",
                marginLeft: 12,
                marginRight: 12,
                boxShadow: "1px 1px 10px 0px #00000010",
              }}
            >
              <img
                src={`${serverURL}/images/${item.picture}`}
                style={{
                  width: "80%",
                  padding: 3,
                  borderRadius: 10,
                  height: "auto",

                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </div>
          </Skeleton>
        </div>
      );
    });
  };

  const handleChange=(v,item)=>{
   item['qty']=v
   if(v>0){
    dispatch({type:'ADD_PRODUCT',payload:[item.productdetailid,item]})
    props?.setPageRefresh(!props.PageRefresh)
   }
   else{
    dispatch({type:'DELETE_PRODUCT',payload:[item.productdetailid]})
    props?.setPageRefresh(!props.PageRefresh)

   }
   
  

  }
  const productDetail = props?.data;

  // const showPrice = () => {
  //   return productDetail?.map((item) => item.price);
  // };

  // const images =
  //   productDetail.length > 0 ? productDetail[0].picture.split(",") : [];

  const showImages = (product) => (
    <div>
      {product.picture.split(",").map((image, index) => (
        <img
          key={index}
          src={`${serverURL}/images/${image}`}
          style={{
            width: '68%',
            height: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
          alt={`Product ${index + 1}`}
        />
      ))}
    </div>
  );

  const handleProductDetails=(item)=>{
    navigate('/productdetails',{state:{data:item}})
  }

  const productcard = () => {
    return productDetail.map((item, index) => (
      <div style={{ margin: "20px" }} >
        
        <Paper
          key={index}
          elevation={1}
          style={{
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 9,
            display: "block",
            height: "auto",
            background: "#fff",

            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Grid container spacing={1.6}>
            <Grid item xs={12}>
              <BookmarkAddOutlinedIcon
                style={{ marginLeft: "auto", display: "flex" }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" , aspectRatio:3/3}}
              onClick={()=>{handleProductDetails(item)}}
            >
              {showImages(item)}
            </Grid>

            <Grid item xs={12} style={{ position: "relative" }}>
            <Typography
                style={{
                  fontWeight: "bolder",
                  fontStyle: "kanit",
                  fontSize: matchesMD?"0.7":"1.0em",
                  marginLeft:4,
                }}
                variant="h6"
              >
               {item.productname}
              </Typography>
              <Typography
                style={{
                  fontWeight: "bolder",
                  fontStyle: "kanit",
                  fontSize: matchesMD?"0.7":"1.0em",
                  marginLeft:4,
                }}
                variant="h6"
              >
            
              </Typography>
              <div
               style={{
                fontSize: '0.8em',
                display:'flex',
                fontWeight: "bolder",
                margin:5,
                fontStyle: "kanit",
                overflow:'hidden',
                textOverflow:'ellipsis',
                display:'-webkit-box',
                WebkitLineClamp:'1',
                WebkitBoxOrient:'vertical'
              
               
               
              }}
              variant="body2">{item.description?.length<=20?<div>{item.description}<div> &nbsp;</div></div>:item.description}</div>
              
             <div>{item.weight}{item.weighttype}</div> 
            </Grid>

            <Grid
              item
              xs={12}
             
            >
              <Typography  style={{
                fontWeight: "bold",
                
                display: "flex",
                position: "relative",
                alignItems: "center",
             
              }}>
              {item.price - item.offerprice === 0 ? (
  <span>&#8377;{item.price}</span>
) : (
  <>
    <span style={{ textDecoration: 'line-through', marginRight: 5, fontWeight: 500 }}>
      &#8377;{item.price}
    </span>
    <span>&#8377;{item.offerprice}</span>
  </>
)}

</Typography>

            </Grid>

            <Divider />

            <Grid
              item
              xs={12}
              style={{
                fontWeight: "bolder",
                fontSize: '70%',
                display: "flex",
                marginRight: 3,
               
              }}
            >
              <AccessTimeFilledIcon style={{ width: '14%', marginRight: 5,marginTop:-3 }} />
              Delivery within 2-3 days
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
               <PlusMinusComponent   qty={productFromRedux[item?.productdetailid]?.qty || 0} onChange={(v)=>handleChange(v,item) } width={'100%'}/>
                <Button
                  variant="contained"
                  fullWidth
                  style={{ backgroundColor: "#6290e0" }}
                >
                  Buy
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </div>
    ));
  };
  const handleForward = () => {
    sld.current.slickNext();
  };
  const handleBackward = () => {
    sld.current.slickPrev();
  };
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          margin: "5px 0px 15px 15px",
          fontWeight: "bold",
          fontSize: 10,
        }}
      >
        { <Skeleton />}
      </div>
      <div
        style={{
          margin: "10px 0px 15px 15px",
          fontWeight: "bold",
          fontSize: "120%",
        }}
      >
        {props.title}
      </div>
  
      { matchesMD?<div></div>:<div
        style={{
          zIndex: 2,
          top: "40%",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "#95a5a6",
          opacity: 0.6,
        }}
      >
        
        <ArrowBackIosIcon onClick={handleBackward} />
      </div>}
     
      
      <Slider ref={sld} {...settings}>
  {productDetail && productDetail.length ? productcard() : showProductCardSlideShimmer()}
</Slider>

   
      { matchesMD?<div></div>:<div
        style={{
          zIndex: 2,
          top: "40%",
          left: "98%",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "#95a5a6",
          opacity: 0.6,
        }}
      >
        <ArrowForwardIosIcon onClick={handleForward} />
      </div>}
    </div>
  );
}
