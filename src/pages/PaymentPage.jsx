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
        <div>
          <Card
            title="Cigányok származása"
            src="https://placehold.co/250x150"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. "
            price="250"
            type="big"
            content={[
              "Cigányok származása",
              "Cigányok származása",
              "Cigányok származása",
              "Cigányok származása",
            ]}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default PaymentPage;
