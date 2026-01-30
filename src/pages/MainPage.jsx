import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import LaptopImage from "../assets/images/laptop.png";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../app/api";
import { useBilling, useLoading } from "../context/LoadingContext";
import Swal from "sweetalert2";
import getPlansBySeacrh from "../app/search";
import sortPlans from "../app/sort";

const MainPage = (props) => {
  const [plans, setPlans] = useState([]);
  const [plansByBackend, setPlansByBackend] = useState([]);
  const {setIsLoading, isLoading} = useLoading()
  const [search, setSearch] = useState("");
  const [navbarSearch, setNavbarSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { isReceiptNeeded, setIsReceiptNeeded } = useBilling();

    const fetchPlans = async () => {
    try {
      const res = await api.get("/plans/get/all");

      const sortedPlans = sortPlans(res.data.notes);

      setPlans(sortedPlans);
      setPlansByBackend(sortedPlans);
      setIsLoading(false);

      const searchQuery = searchParams.get("search");
      if (searchQuery) {
        setNavbarSearch(searchQuery);
        const result = getPlansBySeacrh(searchQuery, sortedPlans);
        const filtered = result.map(r => r.item);
        setPlans(filtered);
        setSearchParams({});
        setTimeout(() => {
          const element = document.getElementById("notes");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } catch (err) {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Hiba a jegyzetek lekérsekor',
        text: err?.response?.data?.error,
        showConfirmButton: true
      })
      setIsLoading(false)
    }
  }

  const handleSearch = (search) => {
    setSearch(search);
    if (search === "") {
      setPlans(sortPlans(plansByBackend));
      return
    }
    const result = getPlansBySeacrh(search, plansByBackend);
    const filtered = result.map(r => r.item);
    setPlans(filtered);
  }

  const handleNavbarSearch = (search) => {
    setNavbarSearch(search);
    if (search === "") {
      setPlans(sortPlans(plansByBackend));
      return
    }
    const result = getPlansBySeacrh(search, plansByBackend);
    const filtered = result.map(r => r.item);
    setPlans(filtered);
    const element = document.getElementById("notes");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  let timer = 0;
  useEffect( () => { 
    timer++
    if (timer != 1) {
      return
    }
    fetchPlans() 
  }, []);

  const checkNew = (time) => {
    if (Date.now() - time > 7 * 24 * 60 * 60 * 1000) {
      return false;
    }
    return true;
  }
  const checkPopular = (time) => {
    if (Date.now() - time > 30 * 24 * 60 * 60 * 1000) {
      return false;
    }
    return true;
  }
  return (
    <div className="flex flex-col  w-full overflow-x-hidden">
      <Navbar authenticated={props.authenticated} searchValue={navbarSearch} searchOnChange={(e) => handleNavbarSearch(e.target.value)} />
      <div className="w-full flex flex-col lg:flex-row justify-between items-center max-w-300 px-10 mx-auto mt-20 lg:mt-4 pt-30">
        <div className="flex-col flex max-w-100 gap-3 mb-10 lg:mb-0">
          <h1 className="text-3xl text-primary font-extrabold">
            Olcsó fizika jegyzetek dolgozatokra és TZ-kre
          </h1>
          <h2 className="text-primary font-bold">
            Rövid, érthető, lényegre törő leírások – középiskolásoknak
          </h2>
          <div className="flex flex-row gap-2">
            <Button text="Jegyzetek" type="main" href="#notes" />
            <Button text="Hogyan működik?" type="how" href="#howItWorks" />
          </div>
        </div>
        <img src={LaptopImage} className=" w-120" alt="" />
      </div>
      <div className="bg-primary w-[300%] -ms-10 h-25 my-20 rotate-358"></div>

      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="max-w-100 flex flex-col items-center">
            <a className="text-3xl text-primary font-extrabold mb-1" id="notes">
              Jegyzetek
            </a>
            <div className="w-[70%] h-1 bg-highlight rounded-2xl"></div>
          </div>
          <div className="md:w-100">
            <SearchBar value={search} onChange={(e) => handleSearch(e.target.value)} />
          </div>
        </div>
        {plans.length === 0 ? (
          <div className="flex justify-center items-center h-50">
            <h1 className="text-3xl text-primary font-bold">Nincs találat</h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12.5 px-20 sm:px-40 md:px-10 mt-10 max-w-400 place-items-center">
            {plans.map((plan) => (
              <Card
                key={plan.note_id}
                new={checkNew(plan.created_at)}
                popular={plan.price != 0.00 && checkPopular(plan.created_at)}
                free={plan.price == 0.00}
                title={plan.title}
                src={plan.img_path ? plan.img_path : "https://placehold.co/250x150"}
                desc={plan.description}
                price={plan.price}
                type="big"
                content={JSON.parse(plan.summary)}
                noteId={plan.note_id}
              />
            ))}
          </div>
        )}

        <div className="bg-primary w-[300%] -ms-10 h-25 my-20 rotate-358"></div>
        <div className="max-w-100 flex flex-col items-center">
          <a
            className="text-3xl text-primary font-extrabold mb-1"
            id="howItWorks"
          >
            Hogyan Működik?
          </a>
          <div className="w-[70%] h-1 bg-highlight rounded-2xl mb-10"></div>
        </div>
        <div className=" grid md:grid-cols-2   xl:grid-cols-4 mb-12.5 gap-12.5 ">
          <Card
            type="small"
            title="1. Lépés"
            content="Hozz létre egy Profilt"
          />
          <Card
            type="small"
            title="2. Lépés"
            content="Válasszd ki a megfelelő jegyzetet"
          />
          <Card
            type="small"
            title="3. Lépés"
            content="Vásárold meg a kiválasztott jegyzetet"
          />
          <Card
            type="small"
            title="4. Lépés"
            content="Töltsd le a “jegyzeteim” fülnél"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
