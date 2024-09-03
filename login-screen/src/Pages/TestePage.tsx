import React, { useState } from "react";
import { loginUser, registerUser,recoverForgotPassword, validateToken, restorePassword } from "../API/utils";
import { AuthenticationResponse } from "../Types/types";

function TestePage() {
  const [registerResponse, setRegisterResponse] =
    useState<AuthenticationResponse | undefined>(undefined);
  const [loginResponse, setLoginResponse] =
    useState<AuthenticationResponse | undefined>(undefined);
  const [forgotPass, setRecoverForgotPassword] =
    useState<string>("");
    const [TokenAns, setRecoverTokenAns] =
    useState<string>("");
    const [Token, setRecoverToken] =
    useState<string>("");
    const [restorePasswordAns, setRestorePassword] =
    useState<string>("")
    

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
      ).then((res) => {
        localStorage.setItem("token",res.access_token)
        setLoginResponse(res)
      });
    
  }
  function recoverForgotPasswordData() {
    recoverForgotPassword("oliverperboni@gmail.com").then(res =>{
        setRecoverForgotPassword(res)
        console.log(res)
    } )
  }
  function validateTokenData() {
    validateToken(Token,localStorage.getItem("token")).then(res => setRecoverTokenAns(res))
    
  }
  function restorePasswordData() {
    restorePassword("oliverperboni","456",localStorage.getItem("token")).then( res => setRestorePassword(res))
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
      <span>------</span>
      <button type="button" onClick={validateTokenData}>Teste do reset por email</button>
      <input type="text" onChange={e => setRecoverToken(e.target.value)} />
      <span>{Token ? JSON.stringify(Token) : "Nenhum token"}</span>
      <span>{TokenAns ? JSON.stringify(TokenAns) : "Nenhuma resposta ainda"}</span>

      <span>------</span>
      <button type="button" onClick={restorePasswordData}>Teste de trocar a senha</button>
      <span>
        {restorePasswordAns ? JSON.stringify(restorePasswordAns) : "Nenhuma resposta ainda"}
      </span>
    </>
  );
}

export default TestePage;
