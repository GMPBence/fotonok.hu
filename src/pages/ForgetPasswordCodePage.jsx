import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import api from "../app/api";

const LoginPage = () => {
  const [code, setCode] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [newpassword2, setNewpassword2] = useState("");
  const navigate = useNavigate();
  const handleForgotPassword = async () => {
    if (!localStorage.getItem("email") || !code) {
      alert("Kérlek add meg az emailban kapott kódot!");
      return;
    }
    if (!newpassword || !newpassword2) {
      alert("Kérlek add meg az új jelszavad!");
      return;
    }
  
    if (newpassword !== newpassword2) {
      alert("A jelszavak nem egyeznek");
      return;
    }
    
    try {
      const res = await api.post("/auth/forgotpassword/complete", {
        email: localStorage.getItem("email"),
        forgotCode: code,
        newpassword: newpassword
      });

      if (res.data.message) {
        localStorage.removeItem("email");
        navigate("/login");
      } else {
        alert("Hiba történt jelszóváltás közben");
      }
    } catch (err) {
      console.log(err);
      alert("Hiba történt jelszóváltás közben");
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
