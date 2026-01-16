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
    <div className="text-light bg-secondary rounded-2xl flex flex-row justify-between w-full py-2 px-3">
      <input
        value={props.value}
        onChange={handleChange}
        type="text"
        className="w-full outline-0 font-bold"
        placeholder="Keresés..."
      />
      <img src={searchIcon} className="w-6 h-6" alt="" />
    </div>
  );
}
export default SearchBar;
