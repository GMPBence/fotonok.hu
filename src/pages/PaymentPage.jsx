import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../app/api";
const PaymentPage = (props) => {
  const [plan, setPlan] = useState();
  const [payment, setPayment] = useState("");

  const fetchPlans = async () => {
    try {
      console.log("/plans/get?id=" + window.location.search.split("=")[1])
      const res = await api.get("/plans/get?id=" + window.location.search.split("=")[1]);
      console.log(res.data.note.img_path);
      setPlan(res.data.note);
      
    } catch (err) {
      console.error("Hiba a csomagok lekérésekor:", err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handlePay = async () => {
    if (!payment) {
      alert("Kérlek válassz fizetési módot!");
      return;
    }
    const res = await api.post("/payment/checkout/" + payment, {
      note_id: plan.note_id
    });
    console.log(res.data);
    if (res.data.url) {
      window.location.href = res.data.url;
    } 
  };
  return (
    <div className="flex flex-col min-h-screen justify-between gap-3 w-full overflow-x-hidden">
      <Navbar authenticated={props.authenticated} />
      <div className="flex flex-col justify-center items-center gap-7 px-2">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-center">Vásárlás összegzés</h1>
          <div className="bg-highlight h-1 mt-1 rounded-2xl w-[50%]"></div>
        </div>
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-30">
          {plan ? <Card
              key={plan.note_id}
              title={plan.title}
              src="https://placehold.co/250x150"
              desc={plan.description}
              price={plan.price}
              type="payment"
              content={JSON.parse(plan.summary)}
              noteId={plan.note_id}
            />
            :
            <h1>Nincs ilyen csomag</h1>
          }
          <div className="flex flex-col gap-5 justify-between items-center">
            <h1 className="text-xl font-bold">Mivel szeretnél fizetni?</h1>
            <label checked={payment === "stripe"} onChange={() => setPayment("stripe")} htmlFor="card" className="block">
              <input  type="radio" name="payment" id="card" className="hidden peer" />
              <div className="bg-primary text-white w-50 h-25 text-center py-2 px-3 rounded-2xl cursor-pointer peer-checked:border-4 peer-checked:border-highlight">
                <h2 className="text-lg">Bankkártya</h2>
                <p className="text-xs">Egyszerű, és biztonságos fizetés bankkártyával.</p>
              </div>
            </label>

            <label htmlFor="paypal" className="block">
              <input checked={payment === "paypal"} onChange={() => setPayment("paypal")} type="radio" name="payment" id="paypal" className="hidden peer" />
              <div className="bg-primary text-white w-50 h-25 text-center py-2 px-3 rounded-2xl cursor-pointer peer-checked:border-4 peer-checked:border-highlight">
                <h2 className="text-lg">PayPal</h2>
                <p className="text-xs">Kényelmes, és gyors fizetés a paypal fiokoddal.</p>
              </div>
            </label>
            <div>
              <h2 className="text-xl font-bold"> Összesen: {plan?.price ? plan.price : 0} Ft</h2>
              <Button type="primary" text="Fizetés" onClick={handlePay}/>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default PaymentPage;
