import searchIcon from "../assets/images/search.png";

function SearchBar() {
  return (
    <div className="text-light bg-secondary rounded-2xl flex flex-row justify-between w-full py-2 px-3">
      <input type="text" className="w-full outline-0 font-bold" placeholder="Keresés..." />
      <img src={searchIcon} className="w-6 h-6" alt="" />
    </div>
  );
}
export default SearchBar;
