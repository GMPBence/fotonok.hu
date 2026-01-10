import Input from "../components/Input";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const LoginPage = () => {
  return (
    <div className="flex bg-primary  flex-col items-center justify-center h-screen">
      <div className="bg-[#1F243280] w-150.5 h-100 p-10 flex flex-col rounded-2xl gap-5">
        <h1 className="text-white text-4xl font-bold text-center mb-5">
          fotonok.<span className="text-highlight">hu</span>
        </h1>
        <Input type="Email" />
        <Input type="Jelszó" />
        <Input type="Jelszó mégegyszer" />
        <div className="flex flex-col gap-1">
          <Button type="login" text="Regisztráció" />
          <Link to="/Login" className="text-white">
            Már regisztráltál? Bejelentkezés
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
