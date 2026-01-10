import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";

function App() {
  const atRoot = window.location.pathname === "/";
  const authenticated = true;
  if (!atRoot) {
    return <ErrorPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage authenticated={authenticated}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
