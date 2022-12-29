/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { LoggedInHeader } from "../../components/QuestionHeader/LoggedInHeader";
import { LoggedInMobile } from "../../components/Sidebar/LoggedInMobile";
import NavIcon from "../../components/QuestionHeader/NavIcon";
import { LoggedInSidebar } from "../../components/Sidebar/LoggedInSidebar";
import "../../stylesheets/dashboard.css";
import { DashboardWrapper } from "./components/DashboardWrapper";

const Dashboard = ({
  hover,
  setHover,
  hoverState,
  setHoverState,
  handleHoverClose,
  handleHoverOpen,
  windowSize,
  getWindowSize,
  setWindowSize,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      setHover(false);
      setHoverState(false);
    };
  }, []);

  let closeContent = {};
  let openContent = {};

  if (windowSize.innerWidth > 900) {
    closeContent = {
      marginLeft: "250px",
      width: "80%",
    };
    openContent = {
      marginLeft: "85px",
    };
  } else {
    closeContent = {
      marginLeft: "0px",
    };
    openContent = {
      marginLeft: "0px",
    };
  }

  function mobileNav() {
    setShow(!show);
  }

  if (show === false) {
    return (
      <>
        <LoggedInSidebar
          hover={hover}
          handleHoverClose={handleHoverClose}
          handleHoverOpen={handleHoverOpen}
        />
        <LoggedInHeader />

        <div id="dashboard-mainpage">
          <div
            className="dash-body"
            style={hoverState ? closeContent : openContent}
          >
            <DashboardWrapper />
          </div>
        </div>
        <NavIcon onclick={mobileNav} />
      </>
    );
  } else {
    return <LoggedInMobile onclick={mobileNav} />;
  }
};

export default Dashboard;
