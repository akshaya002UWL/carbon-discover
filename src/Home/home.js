import React from "react";
import { BAW } from "../IBM_Automation/baw";
import { Outlet, Link } from "react-router-dom";
import {  Route, Routes } from "react-router-dom";
import { Opertional } from "../IBM_Automation/operation_details";


export const Home = () => {
   
    return (
        <>
        <Outlet />
            <Routes>
              <Route path="/" element={<BAW />} />
             <Route path="common-assets" element={<Opertional />} />
               {/* <Route path="operational-details" element={<FullDetails />} /> */}
              <Route path="*" element={<BAW />} />
            </Routes>
        </>
    );
  };
  