import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import LaptopImage from "../assets/images/laptop.png";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
const MainPage = () => {
  return (
    <div className="flex flex-col  w-full overflow-x-hidden">
      <Navbar />
      <div className="w-full flex flex-row justify-between items-center px-55 mt-4">
        <div className="flex-col flex max-w-100 gap-3">
          <h1 className="text-3xl text-primary font-extrabold">
            Olcsó fizika jegyzetek dolgozatokra és TZ-kre
          </h1>
          <h2 className="text-primary font-bold">
            Rövid, érthető, lényegre törő leírások – középiskolásoknak
          </h2>
          <div className="flex flex-row gap-2">
            <Button text="Jegyzetek" type="main" href="#notes" />
            <Button text="Hogyan működik?" type="main" href="#howItWorks" />
          </div>
        </div>
        <img src={LaptopImage} className=" max-w-120" alt="" />
      </div>
      <div className="bg-primary w-[110%] -ms-10 h-25 my-20 rotate-358"></div>

      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="max-w-100 flex flex-col items-center">
            <a className="text-3xl text-primary font-extrabold mb-1" id="notes">
              Jegyzetek
            </a>
            <div className="w-[70%] h-1 bg-highlight rounded-2xl"></div>
          </div>
          <div className="w-100">
            <SearchBar />
          </div>
        </div>
        <div className="flex flex-row gap-12.5 px-25 mt-10 justify-evenly max-w-400">
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
        <div className="bg-primary w-[110%] -ms-10 h-25 my-20 rotate-358"></div>
        <div className="max-w-100 flex flex-col items-center">
          <a
            className="text-3xl text-primary font-extrabold mb-1"
            id="howItWorks"
          >
            Hogyan Működik?
          </a>
          <div className="w-[70%] h-1 bg-highlight rounded-2xl mb-10"></div>
        </div>
        <div className=" flex flex-row mb-12.5 gap-12.5 ">
          <Card
            type="small"
            title="1. Lépés"
            content="Hozz létre egy Profild"
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
