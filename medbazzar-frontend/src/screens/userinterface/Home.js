import Header from "../../components/userinterface/Header"
import MenuBar from "../../components/userinterface/MenuBar"
import BrandComponent from "../../components/userinterface/brandComponent"
import CategoryComponent from "../../components/userinterface/categoryComponent"
import ProductCardComponent from "../../components/userinterface/productCardComponent"
import SliderComponent from "../../components/userinterface/sliderComponent"
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState,useEffect} from "react"
import { postData,getData } from "../../services/FetchNodeServices"
import { Divider } from "@mui/material"
import { useTheme } from "@mui/material/styles";
import ConcernComponent from "../../components/userinterface/ConcernComponent"
export default function Home(){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    const [bannerList,setBannerList]=useState([]);
    const [brandList,setBrandsList]=useState([]);
    const [categoryList,setCategoryList]=useState([]);
    const [concernList,setConcernList]=useState([]);
    const [pageRefresh,setPageRefresh]=useState(false);
    const [OfferProductList, setOfferProductList]=useState([]);
    const fetchAllBanners=async()=>{
        var result =await postData('userinterface/show_all_banners',{bannertype:"general"})
        setBannerList(result.data)
    }
    const fecthAllBrands=async()=>{
        var result =await getData('userinterface/show_all_brand')
        setBrandsList(result.data)
    }
    const fecthAllCategory=async()=>{
        var result =await getData('userinterface/show_all_category')
        setCategoryList(result.data)
    }
    const fetchAllConcern=async()=>{
        var result =await getData('userinterface/show_all_concern')
        setConcernList(result.data)
        
    }
    const fetchAllOfferProduct=async()=>{
        var result =await postData('userinterface/show_all_products_by_offertype',{ offertype:  "month_end_Sale" })
        setOfferProductList(result.data)
    }
    useEffect(function(){
        fetchAllBanners()
         fecthAllBrands()
         fecthAllCategory()
         fetchAllConcern()
         fetchAllOfferProduct()
        },[]);
    return (<div>
<div style={{position:"sticky",top:0, zIndex:1000}}>
<Header ></Header>
</div>
{matches?<div></div>:<div><MenuBar/></div>}

<div style={{marginTop:20,display:'flex',flexDirection:'column',justifyContent:'center'}}>
<SliderComponent data={bannerList}></SliderComponent>
</div>

<div style={{marginTop:40,display:'flex',flexDirection:'column',justifyContent:'center'}}>
<BrandComponent title='Brands' data={brandList}></BrandComponent>
</div>
<div style={{marginTop:20,display:'flex',flexDirection:'column',justifyContent:'center'}}><Divider sx= { { borderBottomWidth: 5 }}/></div>
<div style={{marginTop:20,display:'flex',flexDirection:'column',justifyContent:'center'}}>
<CategoryComponent title='Category' data={categoryList}/>
</div>

<div style={{marginTop:20,display:'flex',flexDirection:'column',justifyContent:'center'}}><Divider sx= { { borderBottomWidth: 5 }}/></div>
<div style={{marginTop:60,display:'flex',flexDirection:'column',justifyContent:'center'}}>
<ProductCardComponent title='Offer Products' data={OfferProductList} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh}/>
</div>
<div style={{marginTop:20,display:'flex',flexDirection:'column',justifyContent:'center'}}><Divider sx= { { borderBottomWidth: 5 }}/></div>
<div style={{marginTop:20,display:'flex',flexDirection:'column',justifyContent:'center'}}>
<ConcernComponent title='Shop by concern' data={concernList}/>
</div>
    </div>)

    
}