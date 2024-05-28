import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {createRef} from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { serverURL } from "../../services/FetchNodeServices";
import { Grid } from "@mui/material";

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
export default function ProductPicture(props){
  var sld=createRef()
  var sld1=createRef()
    var settings1 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
              
      };
      var settings2 = {
        centerMode: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        swipeToSlide: true    
      };
      var productDetails = props?.item
      var images =Object.values(productDetails.multi_picture.split(','))
      const BigPictureSlide=()=>{
      return  images.map((item)=>{
            return <div  ><img src={`${serverURL}/images/${item}`} style={{width:350,marginLeft:'auto',marginRight:'auto',borderRadius:10,height:'auto',display:'block'}}></img></div>
        })
      }
      const SmallPictureSlide=()=>{
        return images.map((item)=>{
          return <div ><img src={`${serverURL}/images/${item}`} style={{width:70,borderRadius:10,height:'auto',display:'block',aspectRatio:2/2}}></img></div>
        })
      }
      const handleForward=()=>{
        sld.current.slickNext()
        sld1.current.slickNext()
    
      }
      const handleBackward=()=>{
        sld.current.slickPrev()
        sld1.current.slickPrev()
      }
      return (
        <div style={{width:'100%',padding:10,}}>
<div style={{marginLeft:'auto',display:'flex',justifyContent:'flex-end'}} >
                        <FavoriteBorderOutlinedIcon style={{marginRight:20}} />
                        <ShareOutlinedIcon style={{marginRight:20}} />
                    </div>
      
        <Grid container spacing={1} >
          <Grid item xs={3}>
          <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
          <div style={{width:'40%'}}>
            <div style={{ zIndex: 2, top: '10%', right: '92%', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 20, backgroundColor: '#95a5a6', opacity: 0.6 }}>
              <ArrowDropUpIcon onClick={handleBackward} />
            </div>
            <Slider ref={sld} {...settings2}>
              {SmallPictureSlide()}
            </Slider></div></div>
            <div style={{ zIndex: 2, top: '60%', right: '92%', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 20, backgroundColor: '#95a5a6', opacity: 0.6 }}>
              <ArrowDropDownIcon onClick={handleForward} />
            </div>
          </Grid>
          <Grid item xs={9}>
            <Slider ref={sld1} {...settings1}>
              {BigPictureSlide()}
            </Slider>
          </Grid>
        </Grid>  </div>
      );
      



}