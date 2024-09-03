import React, { useState } from "react";
import { loginUser, registerUser,recoverForgotPassword } from "../API/utils";
import { AuthenticationResponse } from "../Types/types";

function TestePage() {
  const [registerResponse, setRegisterResponse] =
    useState<AuthenticationResponse | undefined>(undefined);
  const [loginResponse, setLoginResponse] =
    useState<AuthenticationResponse | undefined>(undefined);
  const [forgotPass, setRecoverForgotPassword] =
    useState<string>("");

  function registerUserData() {
    registerUser(
      "oliverperboni",
      "password",
      "oliverperboni@gmail.com",
      "ADMIN"
    ).then((res) => setRegisterResponse(res));
  }

  function loginUserData() {
    loginUser(
        "oliverperboni",
        "password",
        "oliverperboni@gmail.com",
        "ADMIN"
      ).then((res) => setLoginResponse(res));
    
  }
  function recoverForgotPasswordData() {
    recoverForgotPassword("oliverperboni@gmail.com").then(res =>{
        setRecoverForgotPassword(res)
        console.log(res)
    } )
  }

  return (
    <>
      <button type="button" onClick={registerUserData}>Teste do Registro</button>
      <span>
        {registerResponse ? JSON.stringify(registerResponse) : "Nenhuma resposta ainda"}
      </span>
     <span>------</span>
      <button type="button" onClick={loginUserData}>Teste do Login</button>
      <span>
        {loginResponse ? JSON.stringify(loginResponse) : "Nenhuma resposta ainda"}
      </span>
      <span>------</span>
      <button type="button" onClick={recoverForgotPasswordData}>Teste do reset por email</button>
      <span>
        {forgotPass ? JSON.stringify(forgotPass) : "Nenhuma resposta ainda"}
      </span>
    </>
  );
}

export default TestePage;
