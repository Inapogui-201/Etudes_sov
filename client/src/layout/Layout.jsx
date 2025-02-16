import Footer from "@/components/content/Footer";
import Navigation from "@/components/content/Navigation";
import React from "react";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <div className="min-h-screen ">
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
