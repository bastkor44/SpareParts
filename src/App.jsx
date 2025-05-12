import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import About from "./Pages/About";
import Home from "./Pages/Home";
import Twowheeler from "./Pages/Twowheeler";
import FourWheeler from "./Pages/FourWheeler";
import WishList from "./Pages/WishList";
import Cart from "./Pages/Cart";
import Search from "./Pages/Search";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateListing from "./components/MANAGER-DASHBOARD/CreateListing";
import ManagerBoard from "./components/MANAGER-DASHBOARD/ManagerBoard";
import AdminBoard from "./components/ADMIN-DASHBOARD/AdminBoard";
import ManageManager from "./components/ADMIN-DASHBOARD/ManageManager";
import ManageUsers from "./components/ADMIN-DASHBOARD/ManageUsers";
import Lists from "./components/ADMIN-DASHBOARD/Lists";
import Orders from "./components/ADMIN-DASHBOARD/Orders";
import Transactions from "./components/ADMIN-DASHBOARD/Transactions";
import Listss from "./components/MANAGER-DASHBOARD/Listss";
import ManageUserss from "./components/MANAGER-DASHBOARD/ManageUserss";
import Orderss from "./components/MANAGER-DASHBOARD/Orderss";
import Transactionss from "./components/MANAGER-DASHBOARD/Transactionss";
import CreateListingss from "./components/ADMIN-DASHBOARD/CreateListingss";
import Profile from "./Pages/Profile";
import ForgotPassword from "./Pages/ForgotPassword";
import Payment from "./Pages/Payment";
import Upi from "./Pages/PaymentMethods/Upi";
import CreditCard from "./Pages/PaymentMethods/CreditCard";
import CashonDelivery from "./Pages/PaymentMethods/CashonDelivery";
import AddCategory from "./components/MANAGER-DASHBOARD/AddCategory";
import AddCategoryy from "./components/ADMIN-DASHBOARD/AddCategoryy";

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

function Layout() {
  const location = useLocation();

  const hideHeaderFooter =
    location.pathname.startsWith("/managerboard") ||
    location.pathname.startsWith("/adminboard");

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <MainContents />
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function MainContents() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/twowheeler" element={<Twowheeler />} />
      <Route path="/fourwheeler" element={<FourWheeler />} />
      <Route path="/search" element={<Search />} />
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />

      <Route path="/payment" element={<Payment />} />
      <Route path="/upi" element={<Upi />} />
      <Route path="/debitcard" element={<CreditCard />} />
      <Route path="/cashondelivery" element={<CashonDelivery />} />

      {/* Manager Dashboard Routes */}
      <Route path="/managerboard" element={<ManagerBoard />} />
      <Route path="/managerboard/createlisting" element={<CreateListing />} />
      <Route path="/managerboard/addcategory" element={<AddCategory />} />
      <Route path="/managerboard/list" element={<Listss />} />
      <Route path="/managerboard/user" element={<ManageUserss />} />
      <Route path="/managerboard/order" element={<Orderss />} />
      <Route path="/managerboard/transaction" element={<Transactionss />} />

      {/* Admin Dashboard Routes */}
      <Route path="/adminboard" element={<AdminBoard />} />
      <Route path="/adminboard/manager" element={<ManageManager />} />
      <Route path="/adminboard/createlisting" element={<CreateListingss />} />
      <Route path="/adminboard/addcategory" element={<AddCategoryy />} />

      <Route path="/adminboard/user" element={<ManageUsers />} />
      <Route path="/adminboard/list" element={<Lists />} />
      <Route path="/adminboard/order" element={<Orders />} />
      <Route path="/adminboard/transaction" element={<Transactions />} />
    </Routes>
  );
}

export default App;
