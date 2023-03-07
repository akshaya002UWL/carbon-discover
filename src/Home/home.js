import React from "react";
import { BAW } from "../IBM_Automation/baw";
import { Outlet, Link } from "react-router-dom";
import {  Route, Routes } from "react-router-dom";
import { Opertional } from "../IBM_Automation/operation_details";
import { UIPath } from "../3rdParty/UI Path/ui-path";
import { LandingPage } from "./landing-page";


export const Home = () => {
   
    return (
        <>
        <Outlet />
            <Routes>
              <Route path="/" element={<LandingPage />} />
             <Route path="/baw" element={<BAW />} />
             <Route path="/ui-path" element={<UIPath />} />

               {/* <Route path="operational-details" element={<FullDetails />} /> */}
              <Route path="*" element={<LandingPage />} />
            </Routes>
        </>
    );
  };
  