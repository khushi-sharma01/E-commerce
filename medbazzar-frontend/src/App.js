import Categories from "./screens/admin/Categories";
import DisplayAllCategory from "./screens/admin/DisplayAllCategory";
import Brands from "./screens/admin/Brands";
import DisplayAllBrands from "./screens/admin/DisplayAllBrands";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlusMinusComponent from "./components/userinterface/PlusMinusComponent";
import DisplayAllSubCategory from "./screens/admin/DisplayAllSubCategory";
import Products from "./screens/admin/products";
import SubCategory from "./screens/admin/subCategory";
import DisplayAllProducts from "./screens/admin/DisplayAllProducts";
import ProductDetail from "./screens/admin/ProductDetail";
import DisplayAllProductDetail from "./screens/admin/DisplayAllProductDetail";
import AdminLogin from "./screens/admin/AdminLogin";
import AdminDashboard from "./screens/admin/AdminDashboard";
import Home from "./screens/userinterface/Home";

import ProductDetails from './screens/userinterface/ProductDetails';
import ShowCart from "./components/userinterface/ShowCart";
import Carts from './screens/userinterface/Carts';
import Login from "./screens/userinterface/Login";
import VerifyOTP from "./components/userinterface/verifyOTP";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route element={<Categories />} path={"/category"}></Route>
          <Route
            element={<DisplayAllCategory />}
            path={"/display_all_category"}
          ></Route>
          <Route element={<Brands />} path={"/brand"}></Route>
          <Route
            element={<DisplayAllBrands />}
            path={"display_all_brands"}
          ></Route>
          <Route
            element={<SubCategory></SubCategory>}
            path={"/subcategory"}
          ></Route>

          <Route
            element={<DisplayAllSubCategory />}
            path={"/display_all_subcategory"}
          ></Route>
          <Route element={<Products></Products>} path={"/product"}></Route>
          <Route
            element={<DisplayAllProducts></DisplayAllProducts>}
            path={"/display_all_product"}
          ></Route>

          <Route element={<ProductDetail />} path={"/product_detail"}></Route>
          <Route
            element={<DisplayAllProductDetail />}
            path={"/display_product_detail"}
          ></Route> */}
          <Route
            element={<AdminLogin></AdminLogin>}
            path={"/adminlogin"}
          ></Route>
          <Route
            element={<AdminDashboard></AdminDashboard>}
            path={"/admindashboard/*"}
          ></Route>
          <Route element={<Home/>} path="/home"></Route>
          <Route element={<PlusMinusComponent/>} path="/plus"></Route>
          <Route element={<ProductDetails/>} path="/productdetails"></Route>
          <Route element={<Carts/>} path="/carts"></Route>
          <Route element={<Login/>} path="/login"></Route>
       
        </Routes>
      </Router>

      {/* {<SubCategory></SubCategory>} */}
    </div>
  );
}

export default App;
