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
            <Button text="Jegyzetek" type="main" />
            <Button text="Hogyan működik?" type="main" />
          </div>
        </div>
        <img src={LaptopImage} className=" max-w-120" alt="" />
      </div>
      <div className="bg-primary w-[110%] -ms-10 h-25 my-10 rotate-358"></div>

      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="max-w-100 flex flex-col items-center">
            <h1 className="text-3xl text-primary font-extrabold">Jegyzetek</h1>
            <div className="w-[70%] h-1 bg-highlight rounded-2xl"></div>
          </div>
          <div className="w-100">
            <SearchBar />
          </div>
        </div>
        <div className="flex flex-row gap-10 px-25 mt-10 justify-evenly max-w-400">
          <Card
            title="Cigányok származása"
            src="https://placehold.co/250x150"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. "
            price="250"
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

export default MainPage;
