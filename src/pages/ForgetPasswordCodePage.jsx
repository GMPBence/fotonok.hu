import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import api from "../app/api";
import { useLoading } from "../context/LoadingContext";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [code, setCode] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [newpassword2, setNewpassword2] = useState("");
  const navigate = useNavigate();
  const {setIsLoading} = useLoading()
  const handleForgotPassword = async () => {
    setIsLoading(true)
    if (!localStorage.getItem("email") || !code) {
      Swal.fire({
        icon: 'error',
        title: 'Hiba történt jelszóváltásズben',
        text: 'Minden mező kötelező',
        showConfirmButton: true
      })
      setIsLoading(false)
      return;
    }
    if (!newpassword || !newpassword2) {
      Swal.fire({
        icon: 'error',
        title: 'Hiba történt jelszóvaltetásズben',
        text: 'Minden mező kötelező',
        showConfirmButton: true
      })
      setIsLoading(false)
      return;
    }
  
    if (newpassword !== newpassword2) {
      Swal.fire({
        icon: 'error',
        title: 'Hiba történt jelszóváltásズben',
        text: 'A jelszavak nem egyeznek',
        showConfirmButton: true
      })
      setIsLoading(false)
      return;
    }
    
    try {
      const res = await api.post("/auth/forgotpassword/complete", {
        email: localStorage.getItem("email"),
        forgotCode: code,
        newpassword: newpassword
      });
      setIsLoading(false)
      if (res.data.message) {
        Swal.fire({
          icon: 'success',
          title: 'Sikeresen változtattad a jelszót',
          showConfirmButton: false,
          timer: 1500
        })
        localStorage.removeItem("email");
        setTimeout(() => {
          navigate("/login");
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
      } else if (err?.response?.data?.error === "internal") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a jelszó változtatáskor',
          text: 'Szerverhiba, próbáld meg késöbb',
          showConfirmButton: true,
        })
      } else if (err?.response?.data?.error === "invalid_code") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a jelszó változtatáskor',
          text: 'A megadott kód helytelen',
          showConfirmButton: true,
        })
      } else if (err?.response?.data?.error === "password_too_short") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a jelszó változtatásko',
          text: 'A jelszó hossza minimum 3 karakter kell',
          showConfirmButton: true,
        })
      } else if (err?.response?.data?.error === "password_too_long") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a jelszó változtatásko',
          text: 'A jelszó hossza maximum 255 karakter lehet',
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
      <div className="bg-[#1F243280] sm:w-150.5 h-100 p-10 flex flex-col rounded-2xl gap-5">
        <h1 className="text-white text-4xl font-bold text-center mb-5">
          fotonok.<span className="text-highlight">hu</span>
        </h1>
        <Input placeholder="Emailban kapott kód" type="email" inputType="auth" value={code} onChange={(e) => setCode(e.target.value)} />
        <Input placeholder="Új jelszó" inputType="auth" type="password" value={newpassword} onChange={(e) => setNewpassword(e.target.value)}/>
        <Input placeholder="Új jelszó újra" inputType="auth" type="password" value={newpassword2} onChange={(e) => setNewpassword2(e.target.value)} />
        <div className="flex flex-col gap-1">
          <Button type="login" text="Befejezés" onClick={handleForgotPassword} />
          <Link to="/Login" className="text-white">
            Mégis tudod a jelszavad? Bejelentkezés
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
