import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import api from "../app/api";
import { useLoading } from "../context/LoadingContext";
import Swal from 'sweetalert2';

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {setIsLoading} = useLoading()

  const handleLogin = async () => {
    setIsLoading(true)
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Hiba történt bejelentkezésközben',
        text: 'Minden mező kötelező',
        showConfirmButton: true
      })
      setIsLoading(false)
      return;
    }

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });
      setIsLoading(false)
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        props.setAuthenticated(true);
        Swal.fire({
          icon: 'success',
          title: 'Sikeres bejelentkezés',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (err) {
      console.log();
      if (err?.response?.data?.error === "err_pass_or_user") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt bejelentkezésközben',
          text: 'Helytelen email vagy jelszó',
          showConfirmButton: true
        })
      } else if (err?.response?.data?.error === "internal") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt bejelentkezésközben',
          text: 'Szerverhiba, próbáld újra késöbb',
          showConfirmButton: true
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt bejelentkezésközben',
          text: err?.response?.data?.error,
          showConfirmButton: true
        })
      }
      setIsLoading(false)
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
