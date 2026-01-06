import SearchBar from "./SearchBar";
import Button from "./Button";
function Navbar() {
  return (
    <div className="bg-primary h-20 px-12 py-5 flex flex-row justify-between">
      <h1 className="text-white font-bold text-3xl">
        fotonok.<span className="text-[#F3BA12]">hu</span>
      </h1>
      <div>
        <div className="w-95">
          <SearchBar />
        </div>
        <Button type = "primary" text="asd"/>
      </div>
    </div>
  );
}
export default Navbar;
