import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import { isAuthenticated } from "./app/auth";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ForgetPasswordCodePage from "./pages/ForgetPasswordCodePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import NotesPage from "./pages/NotesPage";
import SuccessfulPaymentPage from "./pages/SuccessfulPaymentPage";
import PaymentPage from "./pages/PaymentPage";
import BillingPage from "./pages/BillingPage";
import Loader from "./layout/LoaderLayout";

function PrivateRoute({ children }) {
  return isAuthenticated()
    ? children
    : <Navigate to="/login" replace />;
}

function LoaderWrapper() {
  const { isLoading } = useLoading();
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  return (
    <>
      {isLoading && <Loader />}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage authenticated={authenticated} />} />
          <Route
            path="/login"
            element={<LoginPage setAuthenticated={setAuthenticated} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgotpassword" element={<ForgetPasswordPage />} />
          <Route
            path="/forgotpassword/complete"
            element={<ForgetPasswordCodePage />}
          />

          <Route
            path="/changepassword"
            element={
              // <PrivateRoute>
              <ChangePasswordPage authenticated={authenticated} />
              /* </PrivateRoute> */
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
              <PaymentPage authenticated={authenticated} price={123} />
            }
          />
          <Route path="/billing" element={
            <BillingPage authenticated={authenticated} />
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function App() {
  return (
    <LoadingProvider>
      <LoaderWrapper />
    </LoadingProvider>
  );
}

export default App;