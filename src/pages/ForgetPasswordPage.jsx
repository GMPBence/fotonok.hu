import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import api from "../app/api";
import { useLoading } from "../context/LoadingContext";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const {setIsLoading} = useLoading()
  const handleForgotPassword = async () => {
    setIsLoading(true)
    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Hiba történt jelszóváltásズben',
        text: 'Minden mező kötelező',
        showConfirmButton: true
      })
      setIsLoading(false)
      return;
    }
    try {
      const res = await api.post("/auth/forgotpassword", {
        email
      });
      setIsLoading(false)
      if (res.data.message) {
        localStorage.setItem("email", email);
        Swal.fire({
          icon: 'success',
          title: 'Sikeresen elküldted az emailt',
          text: 'A jelszóváltáshoz tartozó kódot a megadott emailcímre kiküldtük',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          navigate("/forgotpassword/complete");
        }, 1500);
      }
    } catch (err) {
      if (err?.response?.data?.error === "missing_data") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a jelszó változtatáskor',
          text: 'Minden mező kötelező',
          showConfirmButton: true,
        })
      } else if (err?.response?.data?.error === "invalid_credentials") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a jelszó változtatáskor',
          text: 'A megadott emailcím nem letezik a rendszerünkben',
          showConfirmButton: true,
        })
      } else if (err?.response?.data?.error === "internal") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a jelszó változtatáskor',
          text: 'Szerverhiba, próbáld meg késöbb',
          showConfirmButton: true,
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a jelszó változtatáskor',
          text: err?.response?.data?.error,
          showConfirmButton: true,
        })
      }
      setIsLoading(false)
    }
      
  }
  return (
    <div className="flex bg-primary  flex-col items-center justify-center h-screen">
      <div className="bg-[#1F243280] sm:w-150.5 h-75 p-10 flex flex-col rounded-2xl gap-5">
        <h1 className="text-white text-4xl font-bold text-center mb-5">
          fotonok.<span className="text-highlight">hu</span>
        </h1>
        <Input inputType="auth" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <div className="flex flex-col gap-1">
          <Button type="login" text="Elfelejtettem a jelszavam" onClick={handleForgotPassword} />
          <Link to="/Login" className="text-white">
            Mégis tudod a jelszavad? Bejelentkezés
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
