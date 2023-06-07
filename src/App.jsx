import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPass from "./pages/ForgotPass";
import ResetPass from "./pages/ResetPass";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import Coupon from "./pages/Coupon";
import EditCoupon from "./pages/EditCoupon"
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Brands from "./pages/Brands";
import Colors from "./pages/Colors";
import EditColor from "./pages/EditColor"
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import EditProduct from "./pages/EditProduct"
import AddProduct from "./pages/AddProduct";
import AddBrand from "./pages/AddBrand";
import AddPrCat from "./pages/AddPrCat";
import AddColor from "./pages/AddColor";
import AddCoupon from "./pages/AddCoupon";
import EditBrand from "./pages/EditBrand";
import EditCategory from "./pages/EditCategory";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgotPass" element={<ForgotPass />} />
        <Route path="/resetPass" element={<ResetPass />} />
        <Route path="*" element={<PageNotFound/>}/>
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="*" element={<PageNotFound/>}/>
          <Route path="coupon-list" element={<Coupon />} />
          <Route path="coupon" element={<AddCoupon/>} />
          <Route path="edit-coupon/:id" element={<EditCoupon />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="brand" element={<AddBrand />} />
          <Route path="edit-brand/:id" element={<EditBrand />} />
          <Route path="brand-list" element={<Brands />} />
          <Route path="color" element={<AddColor />} />
          <Route path="edit-color/:id" element={<EditColor />} />
          <Route path="color-list" element={<Colors />} />
          <Route path="category" element={<AddPrCat />} />
          <Route path="category-list" element={<Categories />} />
          <Route path="edit-category/:id" element={<EditCategory />} />
          <Route path="product-list" element={<Products />} />
          <Route path="product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
