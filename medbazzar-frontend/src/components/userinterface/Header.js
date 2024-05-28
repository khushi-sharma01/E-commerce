import { AppBar, MenuItem,Box,Toolbar, Badge } from "@mui/material";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useStyles } from "../../screens/userinterface/CssHome";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../services/FetchNodeServices";
import { UseSelector, useSelector } from "react-redux";
import ShowCartProduct from "./ShowCartProducts";
import { getData,postData } from "../../services/FetchNodeServices";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Collapse from "@mui/material/Collapse";
import SubCategory from './../../screens/admin/subCategory';
export default function Header(props) {
  const navigate = useNavigate();
  const theme = useTheme();
  var products=useSelector((state)=>state.data)
  var keys=Object?.keys(products)
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [status, setStatus] = useState(false);
  const [isOpen, SetIsOpen] = useState(false);
  const [isCollapse, setIsCollapse]=useState(false);
  const [categoryDrawerList,setCategoryDrawerList]=useState([]);
  const [SubCategoryList,setSubCategoryList]=useState([]);
  const handleDrawer = () => {
    setStatus(true);
  };
  const handleClose = () => {
    setStatus(false);
  };
  const showCartDetails=()=>{
    SetIsOpen(true)
  }
  const hideCartDetails=()=>{
    SetIsOpen(false)
  }
  const handleCollapse=()=>{
    
    setIsCollapse(!isCollapse)
  }
  
  const secondarySearchBar = () => {
    return (
      <Box sx={{ flexGrow: 1 ,position:'relative'}}  >
        <AppBar style={{ background: "#fff" }} position="static">
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <MenuIcon
              onClick={handleDrawer}
              style={{ fontSize: 30, color: "#000" }}
            />
            {searchBarComponent()}
            <div
              style={{
                display: "flex",
                width: 70,
                justifyContent: "space-between",
              }}
            >
              <PersonOutlineOutlinedIcon
                style={{ fontSize: 30, color: "#000" }}
              />
              <PhoneOutlinedIcon style={{ fontSize: 30, color: "#000" }} />
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    );
  };

  const searchBarComponent = () => {
    return (
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          margin: 1,
          display: "flex",
          alignItems: "center",
          width: 400,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Products"
          inputProps={{ "aria-label": "search products" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>

        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
        ></IconButton>
      </Paper>
    );
  };

  const fetchAllCategory = async () => {
    var result = await getData("userinterface/display_all_category");
    if (result.status) {
      setCategoryDrawerList(result.data);
    }
  };
  const fetchAllSubCategory = async (cid,event) => {

    
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

  useEffect(function () {
    fetchAllCategory();
  }, []);



  const CategoryDrawerList = () => {
    return (
      <Paper>
        <div className={classes.menuStyle}>
          <List>
            <Divider />
            {categoryDrawerList.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={handleCollapse}>
                  <ListItemIcon>
                   <ExpandMoreIcon/>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <span className={classes.menuItemStyle}>{item.categoryname}</span>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </Paper>
    );
  }
  
  return (
    <Box sx={{ flexGrow: 1 }} onMouseLeave={hideCartDetails} >
      <AppBar style={{backgroundColor: "#b2ccfa"}} position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <img src="logo.png" style={{ width: 150 }} />

          {!matches ? <div>{searchBarComponent()}</div> : <div></div>}

          <div
            style={{
              display: "flex",
              width: !matches ? 110 : 50,
              justifyContent: "space-between",
            }}
          >
            {!matches ? (
              <PersonOutlineOutlinedIcon
                style={{ fontSize: 30, color: "#0e1f45" }}
              />
            ) : (
              <div></div>
            )}
            <Badge badgeContent={keys.length} color="primary">
            <ShoppingCartOutlinedIcon  onMouseOver={showCartDetails} style={{ fontSize: 30, color: "#0e1f45" }} /></Badge>

            {!matches ? (
              <PhoneOutlinedIcon style={{ fontSize: 30, color: "#0e1f45" }} />
            ) : (
              <div></div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <div>{matches ? <div>{secondarySearchBar()}</div> : <div></div>}</div>

      <Drawer anchor={"left"} open={status} onClose={handleClose}>
        <div>{CategoryDrawerList()}</div>
      </Drawer>
      <ShowCartProduct isOpen={isOpen}/>
    </Box>
   
  );
}
