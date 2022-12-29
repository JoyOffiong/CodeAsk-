import React, { useState, useEffect } from "react";
import { LoggedInHeader } from "../../components/QuestionHeader/LoggedInHeader";
import { LoggedInMobile } from "../../components/Sidebar/LoggedInMobile";
import { LoggedInSidebar } from "../../components/Sidebar/LoggedInSidebar";
import { LoggedOutSidebar } from "../../components/Sidebar/LoggedOutSidebar";
import { LoggedOutHeader } from "../../components/QuestionHeader/LoggedOutHeader";
import NavIcon from "../../components/QuestionHeader/NavIcon";
import QuestionsWrapper from "./components/QuestionsWrapper";
import "../../stylesheets/questions.css";
import QuestionModal from "./components/QuestionModal";
import { useAuth } from "../../components/hooks/useAuth.js";

export const Questions = ({
  hover,
  setHover,
  hoverState,
  setHoverState,
  handleHoverClose,
  handleHoverOpen,
  handleHover,
  windowSize,
  getWindowSize,
  setWindowSize,
}) => {
  const [show, setShow] = useState(false);
  const { auth, setReRender, reRender } = useAuth();
  // console.log(auth) 
  // console.log(auth && auth.access && auth.access.token)
  // console.log(auth && auth.access && auth.access.token? "dont render": "rendermodal")
  // const {access}= auth && auth.tokens

useEffect(() => {
  setReRender(!reRender);
}, [show])

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let closeContent = {};
  let openContent = {};

  if (windowSize.innerWidth > 900) {
    closeContent = {
      marginLeft: "150px",
      width: "85%",
    };
    openContent = {
      marginLeft: "0px",
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
        <div className="desktopbackground"></div>
        <div className="question-main">
          {auth && auth.access && auth.access.token? 
            <LoggedInSidebar
              hover={hover}
              handleHoverClose={handleHoverClose}
              handleHoverOpen={handleHoverOpen}
            />
           : 
            <LoggedOutSidebar
              hover={hover}
              handleHoverClose={handleHoverClose}
              handleHoverOpen={handleHoverOpen}
            />
          }

          {auth && auth.access && auth.access.token? <LoggedInHeader />:  <LoggedOutHeader /> }
          <main
            id="main"
            className="question-main "
            style={hoverState ? closeContent : openContent}
          >
            <QuestionsWrapper />

            {auth && auth.access && auth.access.token?  null:<QuestionModal /> }
          </main>
          <NavIcon onclick={mobileNav} />
        </div>
      </>
    );
  } else {
    return <LoggedInMobile onclick={mobileNav} />;
  }
};
