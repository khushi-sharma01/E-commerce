import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import Paper from '@mui/material/Paper';

import { useNavigate } from 'react-router-dom';


export default function ShowCartProduct(props){
    var navigate =useNavigate();
    var products=useSelector((state)=>state.data)
    var keys=Object?.keys(products)
    var values=Object?.values(products)
 
    const ShowCartItem=()=>{
        return values.map((item)=>{
            return <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><div>{item.productname}</div><div>Qty: {item.qty}</div></div>
        })
    }
    return(
        <Paper elevation={3} style={{display:props.isOpen?'flex':'none',position:'absolute',top:64,right:40}}>
            <div style={{width:250,height:'auto',display:'flex',flexDirection:'column',padding:5}}>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <div style={{fontSize:16, fontWeight:"bold"}}>  Order Summary </div>
                    <div> Items : {keys.length}  </div>
                    </div>
                    
                    <Divider/>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>{ShowCartItem()}</div>
                    <div onClick={()=>navigate('/carts')}  style={{margin:10,background:'#0e1f45',color:'#ffff',width:230,height:30,borderRadius:5,textAlign:'center'}}>Proceed to Cart</div>
                

            </div>
        </Paper>
    )
}