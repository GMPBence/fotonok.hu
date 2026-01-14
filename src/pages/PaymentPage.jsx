import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Card from "../components/Card";
import { Link } from "react-router-dom";
const PaymentPage = (props) => {
  return (
    <div className="flex flex-col min-h-screen justify-between gap-3 w-full overflow-x-hidden">
      <Navbar authenticated={props.authenticated} />
      <div className="flex flex-col justify-center items-center gap-7 px-2">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold">Vásárlás összegzés</h1>
          <div className="bg-highlight h-1 mt-1 rounded-2xl w-[50%]"></div>
        </div>
        <div className="flex flex-row gap-30">
          <Card
            title="Cigányok származása"
            src="https://placehold.co/250x150"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. "
            price="250"
            type="payment"
            content={[
              "Cigányok származása",
              "Cigányok származása",
              "Cigányok származása",
              "Cigányok származása",
            ]}
          />
          <div className="flex flex-col gap-5 justify-between items-center">
            <h1 className="text-xl font-bold">Mivel szeretnél fizetni?</h1>
            <label htmlFor="card" className="block">
              <input type="radio" name="payment" id="card" className="hidden peer" />
              <div className="bg-primary text-white w-50 h-25 text-center py-2 px-3 rounded-2xl cursor-pointer peer-checked:border-4 peer-checked:border-highlight">
                <h2 className="text-lg">Bankkártya</h2>
                <p className="text-xs">Egyszerű, és biztonságos fizetés bankkártyával.</p>
              </div>
            </label>

            <label htmlFor="paypal" className="block">
              <input type="radio" name="payment" id="paypal" className="hidden peer" />
              <div className="bg-primary text-white w-50 h-25 text-center py-2 px-3 rounded-2xl cursor-pointer peer-checked:border-4 peer-checked:border-highlight">
                <h2 className="text-lg">PayPal</h2>
                <p className="text-xs">Kényelmes, és gyors fizetés a paypal fiokoddal.</p>
              </div>
            </label>
            <div>
              <h2 className="text-xl font-bold"> Összesen: {props.price} Ft</h2>
              <Button type="primary" text="Fizetés"/>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default PaymentPage;
