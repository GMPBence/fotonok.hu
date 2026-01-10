import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";

function App() {
  const authenticated = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage authenticated={authenticated} />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/ForgetPassword" element={<ForgetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
