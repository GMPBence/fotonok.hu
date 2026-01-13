import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import api from "../app/api";

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Minden mező kötelező");
      return;
    }

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        props.setAuthenticated(true);
        navigate("/");
      } else {
        alert("Hiba történt bejelentkezés közben");
      }
    } catch (err) {
      console.log(err);
      alert("Hiba történt bejelentkezés közben");
    }
  };

  return (
    <div className="flex bg-primary  flex-col items-center justify-center h-screen">
      <div className="bg-[#1F243280] sm:w-150.5 h-100 p-10 flex flex-col rounded-2xl gap-5">
        <h1 className="text-white text-4xl font-bold text-center mb-5">
          fotonok.<span className="text-highlight">hu</span>
        </h1>
        <Input inputType="auth" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <div className="flex flex-col gap-1">
            <Input inputType="auth" type="password" placeholder="Jelszó" value={password} onChange={e => setPassword(e.target.value)} />
            <Link to="/forgotpassword" className="text-white ">
              Elfelejtetted a jelszavad? Kattints ide!
            </Link>
        </div>
        <div className="flex flex-col gap-1">
          <Button type="login" text="Bejelentkezés" onClick={handleLogin} />
          <Link to="/register" className="text-white">
            Új vagy itt? Regisztráció
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
