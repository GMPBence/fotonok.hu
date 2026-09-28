import searchIcon from "../assets/images/search.png";
import { useNavigate, useLocation } from "react-router-dom";

function SearchBar(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    if (location.pathname !== "/") {
      navigate(`/?search=${encodeURIComponent(e.target.value)}#notes`);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className="text-light bg-secondary rounded-xl flex flex-row justify-between w-full py-2.5 px-4 ring-1 ring-white/5 focus-within:ring-highlight/70 transition-shadow">
      <input
        value={props.value}
        onChange={handleChange}
        type="text"
        aria-label="Jegyzetek keresése"
        className="w-full outline-0 text-white font-light placeholder:text-light/80 bg-transparent"
        placeholder="Keresés..."
      />
      <img src={searchIcon} className="w-5 h-5 opacity-80" alt="" />
    </div>
  );
}
export default SearchBar;
