import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import api from "../app/api";
import { useLoading } from "../context/LoadingContext";
import Swal from "sweetalert2";
const NotesPage = (props) => {
  const [plans, setPlans] = useState();
  const {setIsLoading} = useLoading()

  const fetchPlans = async () => {
    try {
      setIsLoading(true)
      const res = await api.get("/plans/get/user");
      setPlans(res.data.notes);
      setIsLoading(false)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Hiba a jegyzetek lekérsekor',
        text: err?.response?.data?.error,
        showConfirmButton: true
      })
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="flex flex-col min-h-screen justify-between gap-3 w-full overflow-x-hidden pt-30">
      <Navbar authenticated={props.authenticated} />
      <div className="flex flex-col justify-center items-center gap-7">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold">Jegyzeteim</h1>
          <div className="bg-highlight h-1 mt-1 rounded-2xl w-[50%]"></div>
        </div>
        <div className="sm:w-150 flex gap-5 flex-col">
          {plans && plans.length > 0 ? plans.map((plan) => (
              <Card type="note" key={plan.note_id} title={plan.title} size={plan.file_size} id={plan.note_id} />
            )) : <>
            <h2 className="text-center text-xl">Még nincsenek jegyzeteid. Vásárolj most, és kezdj el tanulni!</h2>
          </>}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default NotesPage;
