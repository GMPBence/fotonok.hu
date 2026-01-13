import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import api from "../app/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleForgotPassword = async () => {
    if (!email) {
      alert("Kérlek add meg az email címed!");
      return;
    }
    try {
      const res = await api.post("/auth/forgotpassword", {
        email
      });

      if (res.data.message) {
        localStorage.setItem("email", email);
        navigate("/forgotpassword/complete");
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
