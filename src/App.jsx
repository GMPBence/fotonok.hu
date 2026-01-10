import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const authenticated = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage authenticated={authenticated} />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
