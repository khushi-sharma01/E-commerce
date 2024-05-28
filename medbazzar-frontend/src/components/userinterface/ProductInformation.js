import { Button, Divider, Grid } from "@mui/material";
import parse from "html-react-parser";
import PlusMinusComponent from "./PlusMinusComponent";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";

export default function ProductInformation(props) {
  var productFromRedux = useSelector((state) => state.data);
  var values = Object.values(productFromRedux);
  var navigate = useNavigate();
  var product;
  if (values?.length == 0) {
    product = props?.item;
    product["qty"] = 0;
  } else {
    var prd = productFromRedux[props.item?.productdetailid];
    if (prd === undefined) {
      product = props?.item;
      product["qty"] = 0;
    } else {
      product = prd;
    }
  }

  var dispatch = useDispatch();

  const handleChange = (v, item) => {
    if (v > 0) {
      item["qty"] = v;

      dispatch({ type: "ADD_PRODUCT", payload: [item.productdetailid, item] });
    } else {
      dispatch({ type: "DELETE_PRODUCT", payload: [item.productdetailid] });
    }
    props.setPageRefresh(!props.pageRefresh);
  };

  useEffect(function () {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    //    <div style={{width:'100%',display:'flex',justifyContent:'center',background:'#d3d3d324'}} >
    <div style={{ width: "80%", padding: 10 }}>
      <div style={{ fontWeight: "bold", fontSize: 18 }}>
        {product?.productname}, {product?.weight} {product?.weighttype}
      </div>
      <div style={{ fontWeight: "bold", fontSize: 18 }}>
        {product?.productsubname}
      </div>

      <div style={{ fontWeight: "bold", fontSize: 13 }}>
        <a href="#">Be the First One to Review</a>
      </div>
      <div style={{ fontWeight: "bold", fontSize: 25 }}>
        &#8377;{" "}
        {product?.offerprice - product?.price != 0
          ? product?.offerprice
          : product?.price}
      </div>
      <span style={{ fontWeight: "bold", fontSize: 10 }}>
        (incl. all Taxes)
      </span>
      <hr />
      <div style={{ fontWeight: "bold", fontSize: 18, color: "grey" }}>
        <s>MRP:&#8377;{product?.price}</s>
        <span style={{ margin: 5, color: "black" }}>
          {product?.offerprice - product?.price != 0 ? (
            <div>(save &#8377; {product?.price - product?.offerprice})</div>
          ) : (
            <div></div>
          )}
        </span>
      </div>

      <div style={{ marginTop: 20 }}>
        <div>
          <div style={{ marginBottom: 10, fontWeight: "bold", fontSize: 15 }}>
            Weight-Type
          </div>
          <Button style={{ marginRight: 10 }} type="radio" variant="outlined">
            Ml
          </Button>
          <Button style={{ marginRight: 10 }} type="radio" variant="outlined">
            Ltr
          </Button>
          <Button style={{}} type="radio" variant="outlined">
            MM
          </Button>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div>
          <div style={{ marginBottom: 10, fontWeight: "bold", fontSize: 15 }}>
            Type
          </div>
          <Button style={{ marginRight: 10 }} type="radio" variant="outlined">
            Bottle
          </Button>
          <Button style={{ marginRight: 10 }} type="radio" variant="outlined">
            Strips
          </Button>
          <Button style={{}} type="radio" variant="outlined">
            Packs
          </Button>
        </div>
      </div>

      <div style={{ marginTop: 20, width: "70%" }}>
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid item xs={6}>
            <PlusMinusComponent
              qty={product?.qty}
              onChange={(v) => handleChange(v, product)}
              width={"100%"}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => navigate("/home")}
              fullWidth
              size="small"
              style={{
                background: "#145c47",
                color: "#fff",
                fontWeight: "bold",
                marginLeft: 5,
              }}
            >
              Continue Shopping
            </Button>
          </Grid>
        </Grid>
      </div>

      <h3>Super Saving (2 Offers)</h3>
      <div>
        <hr />
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            border: "solid 1px",
            width: 130,
            borderRadius: 10,
            marginRight: 10,
            padding: 10,
          }}
        >
          <div style={{ color: "orangered" }}>ICICI Bank</div>
          <hr />
          <p style={{ fontSize: 10 }}>
            Rs.50 Instant Discount on ICICI Bank Credit Card on Mobile selected
            products. Select the offer from...
          </p>
          <span style={{ fontSize: 10 }}>View all..</span>
        </div>

        <div
          style={{
            border: "solid 1px",
            width: 130,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <div style={{ color: "lightblue" }}>SBI Bank</div>
          <Divider />
          <p style={{ fontSize: 10 }}>
            Rs.50 Cashback on ICICI credit card transactions. Cashback will be
            credited in customers account after...
          </p>
          <span style={{ fontSize: 10 }}>View all..</span>
        </div>
      </div>

      <div
        style={{
          border: "solid 1px",
          marginTop: 20,
          padding: 10,
          borderRadius: 10,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: "bold" }}>
          Product Description
        </div>
        <hr />
        <div style={{ fontSize: 13 }}>{parse(product?.pd_description)}</div>
      </div>
    </div>
    // </div>
  );
}
