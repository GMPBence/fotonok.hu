import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { Link } from "react-router-dom";
const SuccessfulPaymentPage = (props) => {
  return (
    <div className="flex flex-col min-h-screen justify-between gap-3 w-full overflow-x-hidden" >
      <Navbar authenticated={props.authenticated} />
      <div className="flex flex-col justify-center items-center gap-7 px-2 pt-30">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold">Sikeres Vásárlás!</h1>
          <div className="bg-highlight h-1 mt-1 rounded-2xl w-[50%]"></div>
        </div>
          <p className="sm:w-125 text-center text-xl">
            Köszönjük a vásárlását, amennyiben 5 percen bellül nem kapja meg a
            vásárolt terméket, kérjük keressen minket fel a bajan@fotonok.hu
            emailcímen keresztül!
          </p>
          <Link to="/"className=""><Button type ="primary" text="Vissza a főoldalra"/></Link>
      </div>
      <Footer />
    </div>
  );
};
export default SuccessfulPaymentPage;
