import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import { serverURL, getData, postData } from "../../services/FetchNodeServices";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { createRef } from "react";
import { Skeleton } from "@mui/material";
export default function BrandComponent(props) {
  var sld = createRef();
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };
  const showBrandSlideShimmer = () => {
    return ["", "", "", "", "", "", ""]?.map((item) => {
      return (
        <div>
          <Skeleton height={174} width={174} animation="wave">
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
  // Define brands data
  var brands = props?.data;
  // Extract images from brand data

  // Define box function to render image boxes
  const box = () => {
    return brands?.map((brand, index) => (
      <div key={index}>
        <img
          src={`${serverURL}/images/${brand.picture}`}
          style={{
            width: "95%",
            height: "auto",
            borderRadius: 9,
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          alt={`Brand ${index + 1}`}
        />
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
      <Slider ref={sld} {...settings}>
      {brands.length ? box() : showBrandSlideShimmer()}
      </Slider>
      <div
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
      </div>
    </div>
  );
}
