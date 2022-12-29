import { LoggedInSidebar } from "../../components/Sidebar/LoggedInSidebar";
import { LoggedInHeader } from "../../components/QuestionHeader/LoggedInHeader";
import React, { useState, useEffect } from "react";
import NavIcon from "../../components/QuestionHeader/NavIcon";
import "../../stylesheets/answers.css";
import { LoggedInMobile } from "../../components/Sidebar/LoggedInMobile";
import { AnswersRightWrap } from "./Components/AnswersRightWrap";
import { AnswersLeftWrap } from "./Components/AnswersLeftWrap";

export const Answers = ({
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

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      setHover(false);
      setHoverState(false);
    };
  }, []);

  let closeContent = {};
  let openContent = {};

  let closeAnswers = {};
  let openAnswers ={};

  if (windowSize.innerWidth > 900) {
    closeContent = {
      marginLeft: "250px",    
    };
    openContent = {
      marginLeft: '75px',
    };
  } else {
    closeContent = {
      marginLeft: '0px',
    };
    openContent = {
      marginLeft: '0px',
    };
  }

  if (windowSize.innerWidth > 900) {
    closeAnswers = {
      width:"65%" ,    
      marginLeft:"10px"
    };
    openAnswers= {
      width: '68%',
      marginLeft:"30px"
    };
  } else {
    closeAnswers = {
      marginLeft: '0px',
    };
    openAnswers= {
      marginLeft: '0px',
    };
  }
  function mobileNav() {
    setShow(!show);
  }

  if (show === false) {
    return (
      <React.Fragment>
        <LoggedInSidebar
          hover={hover}
          handleHoverClose={handleHoverClose}
          handleHoverOpen={handleHoverOpen}
         /> 
        <LoggedInHeader />

          <main id="main"  style={hoverState ? closeContent : openContent} >
            <div className="answer-page" id="answersmainPage" style={hoverState ? closeAnswers : openAnswers}>
              <AnswersLeftWrap />
            <AnswersRightWrap />
            </div>
          </main>

          <NavIcon onclick={mobileNav} />
        </React.Fragment>
    )
    
  } else {
    return <LoggedInMobile onclick={mobileNav} />;
  }
};
