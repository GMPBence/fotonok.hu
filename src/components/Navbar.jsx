import SearchBar from "./SearchBar";
import Button from "./Button";
function Navbar() {
  return (
    <div className="bg-primary h-20 px-12 py-5 flex flex-row justify-between">
      <h1 className="text-white font-bold text-3xl">
        fotonok.<span className="text-highlight">hu</span>
      </h1>
      <div className="flex flex-row gap-3">
        <div className="w-95">
          <SearchBar />
        </div>
        <div className="">
          <Button type="primary" text="Profil" />
        </div>
      </div>
    </div>
  );
}
export default Navbar;
