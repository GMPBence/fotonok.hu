import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const MainPage = () => {
  return (
    <div className="flex flex-col justify-between w-full h-screen">
      <Navbar />
      <div className="bg-red-300">MainPage</div>
      <Footer />
    </div>
  );
};

export default MainPage;
