import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import api from "../app/api";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import Swal from "sweetalert2";
const ChangePasswordPage = (props) => {
  const [password, setPassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [newpassword2, setNewpassword2] = useState("");
  const navigate = useNavigate();
  const {setIsLoading} = useLoading()

  const handleResetPassword = async () => {
    setIsLoading(true)
    if (!newpassword || !newpassword2 || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Hiba történt jelszóváltás közben',
        text: 'Minden mező kötelező',
        showConfirmButton: true
      })
      setIsLoading(false)
      return;
    }
  
    if (newpassword !== newpassword2) {
      Swal.fire({
        icon: 'error',
        title: 'Hiba történt jelszóváltás közben',
        text: 'A jelszavak nem egyeznek',
        showConfirmButton: true
      })
      setIsLoading(false)
      return;
    }
    
    try {
      const res = await api.post("/auth/reset/password", {
        oldpassword: password,
        newpassword: newpassword
      });
      setIsLoading(false)
      if (res.data.message) {
        Swal.fire({
          icon: 'success',
          title: 'Sikeres jelszóváltás',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          navigate("/");
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
      } else if (err?.response?.data?.error === "password_too_short") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a jelszó változtatáskor',
          text: 'A jelszó hossza minimum 3 karakter kell',
          showConfirmButton: true,
        })
      } else if (err?.response?.data?.error === "password_too_long") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a jelszó változtatáskor',
          text: 'A jelszó hossza maximum 255 karakter lehet',
          showConfirmButton: true,
        })
      } else if(err?.response?.data?.error === "invalid_credentials") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a jelszó változtatáskor',
          text: 'Nem adhatod meg ugyan azt a jelszót, amit jelenleg is használsz',
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
    <div className="flex flex-col h-screen justify-between w-full overflow-x-hidden">
      <Navbar authenticated={props.authenticated} />
      <div className="flex flex-col justify-center items-center gap-7 pt-30">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold">Jelszó váltás</h1>
          <div className="bg-highlight h-1 mt-0.5 rounded-2xl w-[50%]"></div>
        </div>
        <div className="flex flex-col gap-6 sm:w-100">
          <Input placeholder="Jelenlegi jelszó"  type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Input placeholder="Új jelszó" type="password" value={newpassword} onChange={(e) => setNewpassword(e.target.value)}/>
          <Input placeholder="Új jelszó újra" type="password" value={newpassword2} onChange={(e) => setNewpassword2(e.target.value)}/>
          <Button type="changePass" text="Jelszó váltás" onClick={handleResetPassword} />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ChangePasswordPage;
