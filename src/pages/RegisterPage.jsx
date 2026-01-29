import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import api from "../app/api";
import { useLoading } from "../context/LoadingContext";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [aszfAccepted, setAszfAccepted] = useState(false);
  const navigate = useNavigate();
  const { setIsLoading } = useLoading()

  const handleRegister = async () => {
    setIsLoading(true)
    if (!email || !password || !password2) {
      Swal.fire({
        icon: 'error',
        title: 'Hiba történt a regisztrációkor',
        text: 'Minden mező kötelező',
        showConfirmButton: true
      })
      setIsLoading(false)
      return;
    }

    if (!aszfAccepted) {
      Swal.fire({
        icon: 'error',
        title: 'Hiba történt a regisztrációkor',
        text: 'Az ÁSZF és az Adatvédelmi Tájékoztató elfogadása kötelező',
        showConfirmButton: true
      })
      setIsLoading(false)
      return;
    }

    if (password !== password2) {
      Swal.fire({
        icon: 'error',
        title: 'Hiba történt a regisztrációkor',
        text: 'A jelszavak nem egyeznek',
        showConfirmButton: true
      })
      setIsLoading(false)
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        email,
        password,
      });
      setIsLoading(false)
      if (res.data.message) {
        Swal.fire({
          icon: 'success',
          title: 'Sikeres regisztráció',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      if (err?.response?.data?.error === "missing_data") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a regisztrációkor',
          text: 'Minden mező kötelező',
          showConfirmButton: true,
        })
      } else if (err?.response?.data?.error === "email_too_long") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a regisztrációkor',
          text: 'Az email hossza maximum 255 karakter lehet',
          showConfirmButton: true,
        })
      } else if (err?.response?.data?.error === "password_too_short") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a regisztrációkor',
          text: 'A jelszó hossza minimum 3 karakter kell',
          showConfirmButton: true,
        })
      } else if (err?.response?.data?.error === "password_too_long") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a regisztrációkor',
          text: 'A jelszó hossza maximum 255 karakter lehet',
          showConfirmButton: true,
        })
      } else if (err?.response?.data?.error === "already_taken") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a regisztrációkor',
          text: 'Ez az email cím már regisztrálva van',
          showConfirmButton: true,
        })
      } else if (err?.response?.data?.error === "internal") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a regisztrációkor',
          text: 'Szerverhiba, próbáld újra késöbb',
          showConfirmButton: true,
        })
      } else if (err?.response?.data?.error === "invalid_email_format") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a regisztrációkor',
          text: 'Ez az email cím nem helyes',
          showConfirmButton: true,
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a regisztrációkor',
          text: err?.response?.data?.error,
          showConfirmButton: true,
        })
      }
      setIsLoading(false)
    }
  };
  return (
    <div className="flex bg-primary flex-col items-center justify-center h-screen">
      <div className="bg-[#1F243280] sm:w-150.5 h-110 p-10 flex flex-col rounded-2xl gap-5">
        <Link to="/" className="text-white text-4xl font-bold text-center mb-5">
          fotonok.<span className="text-highlight">hu</span>
        </Link>

        <Input inputType="auth" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input inputType="auth" type="password" placeholder="Jelszó" value={password} onChange={e => setPassword(e.target.value)} />
        <Input inputType="auth" type="password" placeholder="Jelszó mégegyszer" value={password2} onChange={e => setPassword2(e.target.value)} />
        <div className="flex flex-row gap-2">
          <input
            type="checkbox"
            id="aszf"
            checked={aszfAccepted}
            onChange={(e) => setAszfAccepted(e.target.checked)}
          />
          <label htmlFor="aszf" className="text-white"><span className="text-red-600">*</span>Elfogadom az <Link to="https://fotonok.hu/docs/aszf.pdf" className="text-blue-500">ÁSZF</Link>-et, és az <Link to="https://fotonok.hu/docs/at.pdf" className="text-blue-500">AT</Link>-t</label>
        </div>

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
