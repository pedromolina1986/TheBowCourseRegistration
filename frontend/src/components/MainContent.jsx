import React, { use } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import DashboardAdmin from "./DashboardAdmin";

const MainContent = () => {  

  useEffect(() => {
    
  } , []);

  return (    
    <Outlet />
  );
};

export default MainContent; 