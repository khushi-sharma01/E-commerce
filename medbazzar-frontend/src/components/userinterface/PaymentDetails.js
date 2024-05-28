import React from "react";
import { Grid,Radio,FormControlLabel,RadioGroup, Button, Paper, Divider } from "@mui/material"
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import { useNavigate } from "react-router-dom";
// import Paper from "@mui/material";
import { useSelector } from "react-redux";




export default function PaymentDetails(props){
    var navigate=useNavigate();
    
    var productFromRedux = props?.products
    var product=Object.values(productFromRedux)
    var totalamount=product.reduce((p1,p2)=>{
     var amt=p2.qty*p2.price
     return p1+amt
    },0)

    var amountpaid=product.reduce((p1,p2)=>{
        var amt=p2.qty*(p2.offerprice>0?p2.offerprice:p2.price)
        return p1+amt
       },0)
       
   var save=totalamount-amountpaid    

    const handleclick=()=>{
        navigate('/login')
    }
    
//     var productDetails = [{productdetailid:1, categoryid:2, subcategoryid:3, brandid:4, productid:5, productsubname:'RedBull', weight:250, weighttype:'ml', type:'packet', packaging:'box', qty:3, price:125, offerprice:120, offertype:'Dhamaka', description:'Energy drink, Sugar free', picture:'p1.png'},
//     {productdetailid:2, categoryid:3, subcategoryid:4, brandid:5, productid:6, productsubname:'xc', weight:10, weighttype:'ml', type:'packet', packaging:'box', qty:3, price:125, offerprice:120, offertype:'Dhamaka', description:'sdsfb', picture:'p1.png'},
//     {productdetailid:3, categoryid:4, subcategoryid:5, brandid:6, productid:7, productsubname:'xc', weight:10, weighttype:'ml', type:'packet', packaging:'box', qty:3, price:125, offerprice:120, offertype:'Dhamaka', description:'sdsfb', picture:'p1.png'}
// ]

        return(
            <div>
                <Grid container spacing={2} style={{fontFamily:'kanit'}} >
        
                    <Grid item xs={12} style={{ fontSize:18,fontWeight:'bold',display:'flex',justifyContent:'center',alignItems:'center',background:'#6290e0',color:'white',width:'100%',borderRadius:10,marginTop:10,padding:8}} >
                        Payment Details
                    </Grid>
        
                    <Grid item xs={6} style={{fontSize:18,}} >
                    Total Amount
                    </Grid>
        
                    <Grid item xs={6} style={{fontSize:18,display:'flex',justifyContent:'flex-end',alignItems:'center'}} >
                    &#8377;{totalamount}
                    </Grid>
        
                    <Grid item xs={6} style={{fontSize:18}} >
                       Amount Paid
                    </Grid>
        
                    <Grid item xs={6} style={{fontSize:18,display:'flex',justifyContent:'flex-end',alignItems:'center',marginLeft:'auto',}} >
                    &#8377;{amountpaid}
                    </Grid>
        
                    <Grid item xs={6} style={{fontSize:18,}} >
                      Savings
                    </Grid>
        
                    <Grid item xs={6} style={{fontSize:18,display:'flex',justifyContent:'flex-end',alignItems:'center',marginLeft:'auto',}} >
                        &#8377;{save}
                    </Grid>
                    
                    <Divider />
                    <div style={{ fontSize:18,fontWeight:'bold',display:'flex',justifyContent:'space-evenly',width:'100%',borderRadius:10,marginTop:10}} >
                        <div style={{paddingLeft:12}}>
                            Order Total
                        </div>
                        <div style={{marginLeft:'auto',fontSize:18}}>
                        &#8377;{amountpaid} 
                        </div>
                    </div>

                    <div style={{fontSize:13,margin:10,color:'gray'}} >
                        <i>Price may vary depending on the product batch*</i>
                    </div>
        
                </Grid>

                <hr/>

                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}} >
                    <div>
                        <div style={{display:'flex',alignItems:'center'}} >
                            <span><LocalOfferOutlinedIcon fontSize="small" color="warning" /></span> 
                            <span style={{fontFamily:'kanit',fontWeight:'bold',fontSize:15,marginLeft:4}} >Use Coupons</span>
                        </div>
                        <div style={{fontSize:12 ,fontFamily:'kanit',color:'GrayText'}} >Also get a gift code after placing this order</div>
                    </div>

                    <div>
                        <ArrowForwardIosIcon fontSize="small" />
                    </div>
                </div>

                <hr/>

                <div>

                    <div style={{display:'flex',alignItems:'center',background:'#ffc43d',borderTopLeftRadius:10,borderTopRightRadius:10,padding:5}} >
                        <InfoOutlinedIcon fontSize="small" />
                        <p style={{fontFamily:'kanit',fontSize:13,marginLeft:20}} >Shop above 600.00 to get free delivery</p>
                    </div>

                    
                        <div style={{background:'lightgrey',paddingLeft:5}} >
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="D"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="D" control={<Radio size="small" />} label="Get it Delivered" />
                            <FormControlLabel value="P" control={<Radio size="small" />} label="Pick up from store" style={{marginLeft:'auto'}}/>
                            </RadioGroup>
                        </div>

                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10,paddingLeft:10,padding:10,border:'solid 1px #00000021'}} >
                            <div>
                                <div style={{fontSize:13}} >{product.length} ITEM</div>
                                <div>&#8377; {amountpaid}</div>
                            </div>

                            <div>
                                <Button onClick={handleclick} variant="contained" size="small" style={{background:'#0e1f45'}} > Login to proceed </Button>
                            </div>
                        </div>
                    
                </div>

                <hr style={{marginTop:20}} />

                <div style={{fontFamily:'kanit',fontWeight:'bold',fontSize:17}} >
                    Delivery Instruction
                </div>

                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}} >
                    <div style={{display:'flex',alignItems:'center'}} >
                        <DeliveryDiningOutlinedIcon size="large" />
                        <p style={{marginLeft:10,fontFamily:'kanit',fontSize:15,fontWeight:'bold'}} >Add Delivery Instructions</p>
                    </div>
                    <div>
                    <ArrowForwardIosIcon fontSize="small" />
                    </div>
                </div>



            </div>
            )

}