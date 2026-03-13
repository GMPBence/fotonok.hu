import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-primary pt-10 px-10 pb-5 flex flex-col">
      <div className="flex sm:flex-row sm:justify-between flex-col items-center w-full border-b-2 border-highlight pb-2">
        <h1 className="text-white font-bold text-3xl">
          fotonok.<span className="text-highlight">hu</span>
        </h1>
        <h2 className="text-white text-xl">fotonok.hu © 2026</h2>
      </div>
      <div className="text-white flex sm:flex-row sm:justify-between flex-col items-center pt-2">
        <div>
          <p className="text-xs mb-2 text-center">Fizikadolgozatok könnyedén!</p>
          <p className="text-xs italic text-center sm:text-start">
            — Bajan & Ráb —
          </p>
        </div>
        <div className="flex flex-row gap-10">
          <div>
            <p>Dokumentumok:</p>
            <div className="flex flex-row gap-3">
              <a href="https://fotonok.hu/docs/aszf.pdf" target="_blank" rel="noopener noreferrer" className="text-xs" title="Általános szerződési feltételek">ÁSZF</a>
              <a href="https://fotonok.hu/docs/at.pdf" target="_blank" rel="noopener noreferrer" className="text-xs" title="Adatvédelmi tájékoztató">AT</a>

            </div>
          </div>
          <div>
            <p>Elérhetőségek:</p>
            <p className="text-xs ">info@fotonok.hu</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
