import React from "react";
import { render } from "react-dom";
import { Search, Notification, Switcher } from "@carbon/icons-react";
import logo from './discover.jpg'
import {
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  Theme
} from "@carbon/react";

export const NavHeader = () => {
   
    return (
        <div className="container">
    <Theme theme="white">
      <Header aria-label="IBM Platform Name">
        <HeaderName href="/" prefix="">
          <img className="logo" src={logo} />
        </HeaderName>
        <HeaderNavigation aria-label="IBM [Platform]">
        <HeaderMenu aria-label="IBM Automation " menuLinkName="IBM Automation ">
            <HeaderMenuItem href="/baw">BAW</HeaderMenuItem>
            <HeaderMenuItem href="/">ODM</HeaderMenuItem>
            <HeaderMenuItem href="#">RPA</HeaderMenuItem>
          </HeaderMenu>
          <HeaderMenu aria-label="3rd Party Automation " menuLinkName="3rd Party Automation ">
            <HeaderMenuItem href="/ui-path">UI Path</HeaderMenuItem>
          </HeaderMenu>
          <HeaderMenuItem href="#">Integration Flows</HeaderMenuItem>
        </HeaderNavigation>
      </Header>
    </Theme>
      </div>
    );
  };
  