import { Button } from "@mui/material";
import { useState,useEffect } from "react";
import { AppBar, MenuItem,Box,Toolbar ,Menu} from "@mui/material";


import { serverURL,getData,postData } from "../../services/FetchNodeServices";
export default  function MenuBar()
{   const [anchoE1, setAnchoE1]=useState(null)
    const [categoryList,setCategoryList]=useState([]);
    const [subCategoryList,setSubCategoryList]=useState([]);
    const open =Boolean(anchoE1)
    const fetchAllSubCategory = async (cid,event) => {

        setAnchoE1(event.currentTarget)
        var result = await postData(
          "userinterface/fetch_all_subcategory_by_categoryid",
          {
            categoryid: cid,
          }
        );
        if (result.data) {
          setSubCategoryList(result.data);
        }
      };

      const handleClose=()=>{
        setAnchoE1(null)
      }
    
    
    const fetchAllCategory = async () => {
        var result = await getData("userinterface/display_all_category");
        if (result.status) {
          setCategoryList(result.data);
        }
      };
      useEffect(function () {
        fetchAllCategory();
      }, []);

      const showAllCategory=()=>{

        return categoryList.map((item)=>{
            return <Button onClick={(event)=>{fetchAllSubCategory(item.categoryid,event)}} style={{color:'#fff', fontFamily:'sans-serif', fontWeight:'bold'}}>{item.categoryname}</Button>
        })

      }
      const showAllSubCategory=()=>{

        return subCategoryList.map((item)=>{
            return <MenuItem style={{color:'#000'}}>{item.subcategoryname}</MenuItem>
        })

      }
      
      
    

    return (<div>
<Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ color:'#ffff'}} position="static">
        <Toolbar style={{ display: "flex" , justifyContent:"center" , background: "#6290e0"  ,color:"#fff", fontFamily:'Kanit' }}>
            {showAllCategory()}
            <Menu 

            anchorEl={anchoE1}
            open={open}
            onClose={handleClose}
            
            >
               {showAllSubCategory()}
            </Menu>
        </Toolbar></AppBar></Box>

    </div>)

}