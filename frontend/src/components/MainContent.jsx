import React, { use } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const MainContent = () => {  

  useEffect(() => {
    
  } , []);

  return (    
    <Outlet />
  );
};

export default MainContent; 