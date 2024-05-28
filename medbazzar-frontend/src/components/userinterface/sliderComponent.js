// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import { serverURL, getData, postData } from "../../services/FetchNodeServices";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {createRef} from 'react';
import { Skeleton } from "@mui/material";
export default function SliderComponent(props) {
  var sld=createRef()
  var settings = {
    dots: true,
    autoplay:true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  const showBannerSlideShimmer = () => {
    return ["", "", "", "", "", "", ""]?.map((item) => {
      return (
        <div>
          <Skeleton height={270} width={450} animation="wave">
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
  var banners = props?.data
  var images = Object.values(banners)[0]?.picture.split(",");
  
  const showSlide = () => {
    return images?.map((item, index) => (
      <div >
        <img src={`${serverURL}/images/${item}`} style={{ width: "95%", height:'auto',borderRadius:9,display:'block',marginLeft:"auto",marginRight:'auto' }} />
      </div>
    ));
  };
  const handleForward=()=>{
    sld.current.slickNext()

  }
  const handleBackward=()=>{
    sld.current.slickPrev()

  }

  return (
    <div style={{ position:"relative"}}>
      <div
        style={{
          margin: "6px 0px 15px 15px",
          fontWeight: "bold",
          fontSize: 10,
        }}
      >
        { <Skeleton />}
      </div>
    <div style={{ zIndex:2,top:'40%',position:'absolute',display:'flex',alignItems:'center',justifyContent:'center',width:40,height:40, borderRadius:20,backgroundColor:'#95a5a6',opacity:0.6}}>
<ArrowBackIosIcon onClick={handleBackward}/>
    </div>
     <Slider ref={sld} {...settings}>
     {banners.length ? showSlide() : showBannerSlideShimmer()}
      
   
    </Slider>
    <div style={{ zIndex:2,top:'40%',left:'98%',position:'absolute',display:'flex',alignItems:'center',justifyContent:'center',width:40,height:40, borderRadius:20,backgroundColor:'#95a5a6',opacity:0.6}}>
<ArrowForwardIosIcon onClick={handleForward}/>
    </div>
    </div>
  
  );
}
