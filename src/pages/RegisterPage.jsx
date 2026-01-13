import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import api from "../app/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password || !password2) {
      alert("Minden mező kötelező");
      return;
    }

    if (password !== password2) {
      alert("A jelszavak nem egyeznek");
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        email,
        password,
      });

      if (res.data.message) {
        navigate("/login");
      } else {
        alert("Hiba történt regisztráció közben");
      }
    } catch (err) {
      console.log(err);
      alert("Hiba történt regisztráció közben");
    }
  };
  return (
    <div className="flex bg-primary flex-col items-center justify-center h-screen">
      <div className="bg-[#1F243280] sm:w-150.5 h-100 p-10 flex flex-col rounded-2xl gap-5">
        <h1 className="text-white text-4xl font-bold text-center mb-5">
          fotonok.<span className="text-highlight">hu</span>
        </h1>

        <Input inputType="auth" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input inputType="auth" type="password" placeholder="Jelszó" value={password} onChange={e => setPassword(e.target.value)} />
        <Input inputType="auth" type="password" placeholder="Jelszó mégegyszer" value={password2} onChange={e => setPassword2(e.target.value)} />

        <div className="flex flex-col gap-1">
          <Button type="login" text="Regisztráció" onClick={handleRegister} />
          <Link to="/login" className="text-white">
            Már regisztráltál? Bejelentkezés
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
