
import React from "react"
import { BrowserRouter , Route, Routes } from 'react-router-dom';
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
function App() {

  return (
    <>
    <BrowserRouter>
      <Header/>
      <MainContents/>
      <Footer/>

    </BrowserRouter>
       
    </>
  )
}

function MainContents(){
  return(
<>
<Routes>
<Route path="/" element={<Home/>} />
<Route path="/about" element={<About/>} />
<Route path="/login" element={<Login/>} />
<Route path="/register" element={<Register/>} />

<Route path="/twowheeler" element={<Twowheeler/>} />
<Route path="/fourwheeler" element={<FourWheeler/>} />
<Route path="/search" element={<Search/>} />

<Route path="/wishlist" element={<WishList/>} />
<Route path="/cart" element={<Cart/>} />






</Routes>

</>
  
  
  
  
  ) 
}

export default App
