import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Singup from "./componet/ragister/Singup";
import Layout from "./componet/layout/Layout";// ✅ Import new layout component
import Admin from "./componet/admin/adminroute/Admin";
import Login from "./componet/login/Login";

import { ToastContainer } from 'react-toastify';
import Test from "./componet/test/Test";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<Test />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Singup />} />
          <Route path="/admin/*" element={<Admin/>} />
          
          <Route path="/*" element={<Layout />} />

        </Routes>
      </BrowserRouter>
    
    </>
    
    
  );
}

export default App;
