import React from "react";
import LogInForm from "./LogInForm";
import SignUpIntro from "../../SignUp/components/SignupIntro";
import CodeaskLogo from "../../SignUp/components/CodeaskLogo";


function signInformWrap(){
  return (
    <section className="signin" >

          <CodeaskLogo/>
          {/* signupIntro comes here */}
          <h3 style={{fontSize:"25px", marginBottom: "20px"}}>
            Log Into Your Account
          </h3>
        <SignUpIntro className ={"signup-intro"} paragraph={"Welcome Back! Please Enter Your Details"}/>
         {/* form comes here */}

        <LogInForm/>
    </section>
 )       
}
export default signInformWrap