import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const authenticated = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage authenticated={authenticated} />} />
        <Route path="/LoginPage" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
