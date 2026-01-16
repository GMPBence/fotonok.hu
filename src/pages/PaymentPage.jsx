import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Card from "../components/Card";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../app/api";
import { useLoading } from "../context/LoadingContext";
import Swal from "sweetalert2";
const PaymentPage = (props) => {
  const [plan, setPlan] = useState();
  const [payment, setPayment] = useState("");
  const {setIsLoading} = useLoading()
  const navigate = useNavigate();

  const fetchPlans = async () => {
    try {
      setIsLoading(true)
      const res = await api.get("/plans/get?id=" + window.location.search.split("=")[1]);
      setIsLoading(false)
      if (res.data.note.price == 0.00) {
        Swal.fire({
          icon: 'error',
          title: 'Ez a jegyzet nem vásárolható meg',
          timer: 1500
        })
        setTimeout(() => {
          navigate("/");
        }, 1500);
        return
      }
      setPlan(res.data.note);
    } catch (err) {

      Swal.fire({
        icon: 'error',
        title: 'Hiba a jegyzet lekérsekor',
        text: err?.response?.data?.error,
        showConfirmButton: true
      })
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handlePay = async () => {
    setIsLoading(true)
    try {
      if (!payment) {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a vásárlás során',
          text: 'Muszáj választani egy fizetési lehetőséget',
          showConfirmButton: true
        })
        setIsLoading(false)
        return;
      }
      const res = await api.post("/payment/checkout/" + payment, {
        note_id: plan.note_id
      });
      if (res.data.url) {
        Swal.fire({
          icon: 'success',
          title: 'Áttirányítás...',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          window.location.href = res.data.url;
        }, 1500);
      } 
      setIsLoading(false)
    } catch (err) {
      if (err?.response?.data?.error === "user_already_has_note") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a vásárlás során',
          text: 'Már megvetted ezt a jegyzetet',          
          showConfirmButton: true
        })
      } else if (err?.response?.data?.error === "missing_data"){
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a vásárlás során',
          text: 'A jegyzet azonosítólya hiányzik, kérlek próbáld újra',          
          showConfirmButton: true
        })
      } else if (err?.response?.data?.error === "note_not_found"){
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a vásárlás során',
          text: 'Nincs ilyen jegyzet',          
          showConfirmButton: true
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a vásárlás során',
          text: err?.response?.data?.error,
          showConfirmButton: true
        })
      }
      setIsLoading(false)
    }
  };
  return (
    <div className="flex flex-col min-h-screen justify-between gap-3 w-full overflow-x-hidden">
      <Navbar authenticated={props.authenticated} />
      <div className="flex flex-col justify-center items-center gap-7 px-2 pt-30">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-center">Vásárlás összegzés</h1>
          <div className="bg-highlight h-1 mt-1 rounded-2xl w-[50%]"></div>
        </div>
        {plan ? (<div className="flex flex-col sm:flex-row gap-10 sm:gap-30">
          
          {plan ? <Card
              key={plan.note_id}
              title={plan.title}
              src={plan.img_path}
              desc={plan.description}
              price={plan.price}
              type="payment"
              content={JSON.parse(plan.summary)}
              noteId={plan.note_id}
            />
            :
            <h1>Nincs ilyen csomag</h1>
          }
          <div className="flex flex-col gap-5 items-center">
            <h1 className="text-xl font-bold">Mivel szeretnél fizetni?</h1>
            <label checked={payment === "stripe"} onChange={() => setPayment("stripe")} htmlFor="card" className="block">
              <input  type="radio" name="payment" id="card" className="hidden peer" />
              <div className="bg-primary text-white w-[300px] h-20 text-center py-2 px-3 rounded-2xl cursor-pointer peer-checked:border-4 peer-checked:border-highlight transition-all hover:scale-105" >
                <h2 className="text-lg">Bankkártya</h2>
                <p className="text-xs">Egyszerű, és biztonságos fizetés bankkártyával.</p>
              </div>
            </label>

            <label htmlFor="paypal" className="block">
              <input checked={payment === "paypal"} onChange={() => setPayment("paypal")} type="radio" name="payment" id="paypal" className="hidden peer" />
              <div className="bg-primary text-white w-300px h-20  text-center py-2 px-3 rounded-2xl cursor-pointer peer-checked:border-4 peer-checked:border-highlight transition-all hover:scale-105">
                <h2 className="text-lg">PayPal</h2>
                <p className="text-xs">Kényelmes, és gyors fizetés a paypal fiokoddal.</p>
              </div>
            </label>
            <div>
              <h2 className="text-xl font-bold"> Összesen: {plan?.price ? plan.price : 0} Ft</h2>
              <Button type="primary" text="Fizetés" onClick={handlePay}/>
            </div>
          </div>
        </div>) : <>Nincs ilyen csomag</>}
        
      </div>
      <Footer />
    </div>
  );
};
export default PaymentPage;
