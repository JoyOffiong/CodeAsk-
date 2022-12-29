import React from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { AboutUs } from "./pages/AboutUs/AboutUs";
import SignUp from "./pages/SignUp/SignUp";
import { SignIn } from "./pages/SignIn/SignIn";
import { Questions } from "./pages/Questions/Questions";
import { AskQuestions } from "./pages/AskQuestions/AskQuestions";
import { User } from "./pages/User/User";
import { Discussion } from "./pages/Discussion/Discussion";
import { CheckMail } from "./pages/CheckMail/CheckMail";
import FAQ from "./pages/FAQ/FAQ";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { useState } from "react";
import { Answers } from "./pages/Answers/Answers";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Layout } from "./components/layout";
// import PersistentLogin from "./components/hooks/PersistentLogin";
import { RequiredAuth } from "./components/RequiredAuth";
import { useAuth } from "./components/hooks/useAuth";
import { useEffect } from "react";

function App() {
  const [hoverState, setHoverState] = useState(false);
  const [hover, setHover] = useState(false);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  
  function getWindowSize() {
    const { innerWidth } = window;
    return { innerWidth };
  }
  function handleHoverClose() {
    setHover(false);
    hover ? setHoverState(false) : setHoverState(true);
  }
  function handleHoverOpen() {
    setHover(true);
    hover ? setHoverState(false) : setHoverState(true);
  }

  const { setAuth, setUser, reRender } = useAuth();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const tokens = JSON.parse(localStorage.getItem("tokens"));


  useEffect(() => {
    console.log("tokens")
 
    if (!tokens || !currentUser) return;

    setAuth(tokens);
    setUser(currentUser);
  }, [reRender]);

  return (
    // <Router>
    <Routes>
      {/* <userContext.Provider  value={{
           
      }}> */}

      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<LandingPage />}></Route>

        <Route path="/about-us" element={<AboutUs />}></Route>

        <Route path="/sign-up" element={<SignUp />}></Route>

        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/check-mail" element={<CheckMail />}></Route>

        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/faq" element={<FAQ />}></Route>

        {/* {auth? } */}
        <Route
          path="/questions"
          element={
            <Questions
              hover={hover}
              setHover={setHover}
              handleHoverClose={handleHoverClose}
              handleHoverOpen={handleHoverOpen}
              hoverState={hoverState}
              setHoverState={setHoverState}
              windowSize={windowSize}
              setWindowSize={setWindowSize}
              getWindowSize={getWindowSize}

            />
          }
        ></Route>

        {/* private routes */}

        {/* <Route path="/" element={<PersistentLogin />}> */}
        <Route path="/" element={<RequiredAuth tokens={tokens} />}>
          <Route
            path="/answers/:id"
            element={
              <Answers
                hover={hover}
                setHover={setHover}
                handleHoverClose={handleHoverClose}
                handleHoverOpen={handleHoverOpen}
                hoverState={hoverState}
                setHoverState={setHoverState}
                windowSize={windowSize}
                setWindowSize={setWindowSize}
                getWindowSize={getWindowSize}
              />
            }
          ></Route>

          <Route
            path="/users/:id"
            element={
              <User
                hover={hover}
                setHover={setHover}
                handleHoverClose={handleHoverClose}
                handleHoverOpen={handleHoverOpen}
                hoverState={hoverState}
                setHoverState={setHoverState}
                windowSize={windowSize}
                setWindowSize={setWindowSize}
                getWindowSize={getWindowSize}
              />
            }
          ></Route>

          <Route
            path="/ask-question"
            element={
              <AskQuestions
                hover={hover}
                setHover={setHover}
                handleHoverClose={handleHoverClose}
                handleHoverOpen={handleHoverOpen}
                hoverState={hoverState}
                setHoverState={setHoverState}
                windowSize={windowSize}
                setWindowSize={setWindowSize}
                getWindowSize={getWindowSize}
              />
            }
          ></Route>

          <Route
            path="/dashboard"
            element={
              <Dashboard
                hover={hover}
                setHover={setHover}
                handleHoverClose={handleHoverClose}
                handleHoverOpen={handleHoverOpen}
                hoverState={hoverState}
                setHoverState={setHoverState}
                windowSize={windowSize}
                setWindowSize={setWindowSize}
                getWindowSize={getWindowSize}
              />
            }
          ></Route>

          <Route
            path="/discuss"
            element={
              <Discussion
                hover={hover}
                setHover={setHover}
                handleHoverClose={handleHoverClose}
                handleHoverOpen={handleHoverOpen}
                hoverState={hoverState}
                setHoverState={setHoverState}
                windowSize={windowSize}
                setWindowSize={setWindowSize}
                getWindowSize={getWindowSize}
              />
            }
          ></Route>
        </Route>
        {/* <Route /> */}
        {/* </Route> */}
      </Route>
    </Routes>

    // </Router>
  );
}

export default App;
