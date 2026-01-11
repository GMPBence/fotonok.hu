import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Input from "../components/Input";
import Button from "../components/Button";
const ChangePasswordPage = (props) => {
  return (
    <div className="flex flex-col h-screen justify-between w-full overflow-x-hidden">
      <Navbar authenticated={props.authenticated} />
      <div className="flex flex-col justify-center items-center gap-7">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold">Jelszó váltás</h1>
          <div className="bg-highlight h-1 mt-0.5 rounded-2xl w-[50%]"></div>
        </div>
        <div className="flex flex-col gap-6 w-100">
          <Input color="light" type="Jelenlegi jelszó" />
          <Input color="light" type="Új jelszó" />
          <Input color="light" type="Új jelszó újra" />
          <Button type="changePass" text="Jelszó váltás"/>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ChangePasswordPage;
