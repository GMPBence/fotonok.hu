import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import api from "../app/api";
import { useNavigate } from "react-router-dom";
const ChangePasswordPage = (props) => {
  const [password, setPassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [newpassword2, setNewpassword2] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!newpassword || !newpassword2) {
      alert("Kérlek add meg az új jelszavad!");
      return;
    }
  
    if (newpassword !== newpassword2) {
      alert("A jelszavak nem egyeznek");
      return;
    }
    
    try {
      const res = await api.post("/auth/reset/password", {
        oldpassword: password,
        newpassword: newpassword
      });

      if (res.data.message) {
        navigate("/notes");
      } else {
        alert("Hiba történt jelszóváltás közben");
      }
    } catch (err) {
      console.log(err);
      alert("Hiba történt jelszóváltás közben");
    }
      
  }
  return (
    <div className="flex flex-col h-screen justify-between w-full overflow-x-hidden">
      <Navbar authenticated={props.authenticated} />
      <div className="flex flex-col justify-center items-center gap-7">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold">Jelszó váltás</h1>
          <div className="bg-highlight h-1 mt-0.5 rounded-2xl w-[50%]"></div>
        </div>
        <div className="flex flex-col gap-6 sm:w-100">
          <Input placeholder="Jelenlegi jelszó" inputType="auth" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Input placeholder="Új jelszó" inputType="auth" type="password" value={newpassword} onChange={(e) => setNewpassword(e.target.value)}/>
          <Input placeholder="Új jelszó újra" inputType="auth" type="password" value={newpassword2} onChange={(e) => setNewpassword2(e.target.value)}/>
          <Button type="changePass" text="Jelszó váltás" onClick={handleResetPassword} />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ChangePasswordPage;
