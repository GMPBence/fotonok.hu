import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import LaptopImage from "../assets/images/laptop.png";
const MainPage = () => {
  return (
    <div className="flex flex-col  w-full h-screen">
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
      <Footer />
    </div>
  );
};

export default MainPage;
