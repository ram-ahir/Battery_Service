import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";


import Navbar from "../navbar/Navbar";
import Home from "../home/Home";
import Blog from "../blog/Blog";
import Blog1 from "../blog/Blog1";
import Blog2 from "../blog/Blog2";
import Blog3 from "../blog/Blog3";
import Allprod from "../allprod/Allprod";
import Cart from "../cart/Cart";
import Dealer from "../dealer/Dealer";
import Findby from "../findby/Findby";
import Oneprod from "../oneprod/Oneprod";
import Service from "../sevice/Service";
import Warranty from "../warranty/Warranty";
import Footer from "../footer/Footer";
import Contactus from "../contactus/Contactus";

const Layout = () => {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog1" element={<Blog1 />} />
        <Route path="/blog2" element={<Blog2 />} />
        <Route path="/blog3" element={<Blog3 />} />
        <Route path="/allproduct" element={<Allprod />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dealer" element={<Dealer />} />
        <Route path="/findby" element={<Findby />} />
        <Route path="/oneprod/:id" element={<Oneprod />} />
        <Route path="/service" element={<Service />} />
        <Route path="/warranty" element={<Warranty />} />
        <Route path="/contactus" element={<Contactus />} />
      </Routes>
      <Footer/>
    </>
  );
};

export default Layout;
