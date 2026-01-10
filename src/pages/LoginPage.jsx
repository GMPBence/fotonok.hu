import Input from "../components/Input";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const LoginPage = () => {
  return (
    <div className="flex bg-primary  flex-col items-center justify-center h-screen">
      <div className="bg-[#1F243280] w-150.5 h-100 p-10 flex flex-col">
        <h1 className="text-white text-3xl font-bold text-center mb-5">
          fotonok.<span className="text-highlight">hu</span>
        </h1>
        <div className="flex flex-col gap-7">
          <Input type="Email" />
          <Input type="Jelszó" />
        </div>
        <Link to="ForgetPassword" className="text-white">
          Elfelejtetted a jelszavad? Kattints ide!
        </Link>
        <Button type="login" text="Bejelentkezés"/>
      </div>
    </div>
  );
};

export default LoginPage;
