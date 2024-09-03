import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import PasswordReset from "./Pages/PasswordReset";
import TestePage from "./Pages/TestePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<TestePage />}/>
        {/* <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<PasswordReset />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
