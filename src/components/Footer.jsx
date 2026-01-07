function Footer() {
  return (
    <div className="bg-primary pt-10 px-10 pb-5 flex flex-col">
      <div className="flex flex-row justify-between w-full border-b-2 border-highlight pb-2">
        <h1 className="text-white font-bold text-3xl">
          fotonok.<span className="text-highlight">hu</span>
        </h1>
        <h2 className="text-white text-xl">fotonok.hu © 2026</h2>
      </div>
      <div className="text-white flex flex-row justify-between pt-2">
        <div>
          <p className="text-xs mb-2 ">Fizikadolgozatok könnyedén!</p>
          <p className="text-xs">
            KÉSZÜL BAJAN ÁLTAL ESKÜ ODA IS MEGY A PÉNZ MEG MINDEN, ŐT KELL ÉRTE
            MEGVERNI!!!!
          </p>
        </div>
        <div>
          <p>Elérhetőségek:</p>
          <p className="text-xs ">bajan@fotonok.hu</p>
        </div>
      </div>
    </div>
  );
}
export default Footer;
