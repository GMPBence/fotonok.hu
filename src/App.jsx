import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ForgetPasswordCodePage from "./pages/ForgetPasswordCodePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import NotesPage from "./pages/NotesPage";
import SuccessfulPaymentPage from "./pages/SuccessfulPaymentPage"
import PaymentPage from "./pages/PaymentPage"
import { isAuthenticated } from "./app/auth";
import { useState } from "react";

function PrivateRoute({ children }) {
  return isAuthenticated()
    ? children
    : <Navigate to="/Login" replace />;
}

function App() {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  console.log("User authenticated:", authenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage authenticated={authenticated} />} />
        <Route path="/login" element={<LoginPage setAuthenticated={setAuthenticated} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotpassword" element={<ForgetPasswordPage />} />
        <Route path="/forgotpassword/complete" element={<ForgetPasswordCodePage />} />

        <Route
          path="/changepassword"
          element={
            <PrivateRoute>
              <ChangePasswordPage authenticated={authenticated} />
            </PrivateRoute>
          }
        />

        <Route
          path="/notes"
          element={
            <PrivateRoute>
              <NotesPage authenticated={authenticated} />
            </PrivateRoute>
          }
        />

        <Route
          path="/payment/success"
          element={
            <PrivateRoute>
              <SuccessfulPaymentPage authenticated={authenticated} />
            </PrivateRoute>
          }
        />
         <Route
          path="/payment"
          element={
            // <PrivateRoute>
              <PaymentPage authenticated={authenticated} />
            // </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
