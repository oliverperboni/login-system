import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import PasswordReset from "./Pages/PasswordReset";
import Dashboard from "./Pages/Dashboard";
import TestePage from "./Pages/TestePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/sucesess" element={<Dashboard />} />
        <Route path="/test" element={<TestePage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
