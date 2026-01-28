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
  const [selectedOption, setSelectedOption] = useState("password");
  const [password, setPassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [newpassword2, setNewpassword2] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const navigate = useNavigate();
  const { setIsLoading } = useLoading()

  const handleRadioChange = (value) => {
    setSelectedOption(value);
  }

  const handleDeleteClick = async () => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Fiók törlése',
      text: 'Biztosan törölni szeretnéd a fiókodat? Az összes általad vásárolt jegyzet elveszik!',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Törlés',
      cancelButtonText: 'Mégse'
    });

    if (result.isConfirmed) {
      setIsLoading(true);

      try {
        const res = await api.post("/auth/account/delete");

        setIsLoading(false);

        if (res.data.message) {
          Swal.fire({
            icon: 'success',
            title: 'Fiók sikeresen törölve',
            showConfirmButton: false,
            timer: 1500
          });

          localStorage.removeItem("token");

          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 1500);
        }
      } catch (err) {
        setIsLoading(false);

        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a fiók törlésekor',
          text: err?.response?.data?.error || 'Ismeretlen hiba',
          showConfirmButton: true,
        });
      }
    }
  }

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
      } else if (err?.response?.data?.error === "invalid_credentials") {
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

  const handleChangeEmail = async () => {
    setIsLoading(true)
    if (!newEmail || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Hiba történt email változtatáskor',
        text: 'Minden mező kötelező',
        showConfirmButton: true
      })
      setIsLoading(false)
      return;
    }

    try {
      const res = await api.post("/auth/reset/email", {
        password: password,
        newEmail: newEmail
      });
      setIsLoading(false)
      if (res.data.message) {
        Swal.fire({
          icon: 'success',
          title: 'Sikeres email változtatás',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Hiba történt email változtatáskor',
        text: err?.response?.data?.error || 'Ismeretlen hiba',
        showConfirmButton: true,
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen justify-between w-full overflow-x-hidden">
      <Navbar authenticated={props.authenticated} />
      <div className="flex flex-col justify-center flex-1 items-center gap-7 px-2 pt-30">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-center">Fiók beállítások</h1>
          <div className="bg-highlight h-1 mt-0.5 rounded-2xl w-[50%]"></div>
        </div>
        <div className="flex flex-col w-full items-center">
          <Button
            type="billing"
            name="accountSettings"
            id1="password"
            id2="email"
            label1="Jelszó"
            label2="Email"
            onChange={handleRadioChange}
          />

          {selectedOption === "password" && (
            <div className="w-full max-w-100 flex flex-col gap-5 mt-5">
              <Input placeholder="Jelenlegi jelszó" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Input placeholder="Új jelszó" type="password" value={newpassword} onChange={(e) => setNewpassword(e.target.value)} />
              <Input placeholder="Új jelszó újra" type="password" value={newpassword2} onChange={(e) => setNewpassword2(e.target.value)} />
              <Button type="save" text="Jelszó váltás" onClick={handleResetPassword} />
            </div>
          )}

          {selectedOption === "email" && (
            <div className="w-full max-w-100 flex flex-col gap-5 mt-5">
              <Input placeholder="Jelenlegi jelszó" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Input placeholder="Új email cím" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
              <Button type="save" text="Email váltás" onClick={handleChangeEmail} />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center w-full max-w-100">
          <h1 className="text-2xl font-extrabold text-center">Fiók törlése</h1>
          <div className="bg-highlight h-1 mt-0.5 rounded-2xl w-[50%]"></div>
          <button onClick={handleDeleteClick} className="mt-5 bg-red-600 text-white px-4 py-2 text-xl font-bold rounded-md w-full cursor-pointer hover:bg-red-400 transition-all hover:scale-105">Törlés</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default ChangePasswordPage;
