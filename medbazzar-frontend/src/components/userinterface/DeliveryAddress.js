import { Grid,Divider,Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function DeliveryAddress(props){

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    
    const showAllAddress=(userAddress)=>{

        return userAddress?.map((item)=>{
        return <div style={{display:'flex',flexDirection:'column',padding:10,margin:10}}>
        <div>{item?.address}</div>
        <div>{item?.landmark}</div>
        <div>{item?.state},{item?.city} {item?.pincode}</div>
        </div>

        })
    }


    return(<div style={{display:'flex',width:'50%',border:'solid 1px #00000021',height:'50%',borderRadius:15,padding:10,fontFamily:'kanit',marginTop:40}}>
<Grid container spacing ={3}>

    <Grid item xs={12} style={{fontSize:14,fontWeight:'bolder'}}>
        Dilevery Address
    </Grid>

    <Grid item xs={12} >
    <Divider />
    </Grid>

    <Grid item md={6} xs={12}  style={{fontSize:matches?10:13,fontWeight:'bolder',alignItems:'center',display:'flex',justifyContent:matches?'center':<></>}}>
        { props?.userAddress?.length==0?<span>
     Please add your address to continue</span>:<div>
        <div>{props?.userData?.username}</div>
        {showAllAddress(props?.userAddress)}
     </div>}
    </Grid>

    <Grid item md={6} xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
       

        <Button startIcon={<AddIcon/>} size="small" variant="contained" style={{display:'flex',borderRadius:30,padding:matches?<></>:10,marginLeft:matches?<></>:'auto',fontFamily:'kanit',fontSize:'.8vw',fontWeight:'bolder',justifyContent:'center',alignItems:'center',marginBottom:10,width:'9vw',height:'4vh'}}>
         Add Address
        </Button>

    </Grid>



</Grid>

    </div>)
}