import SearchBar from "./SearchBar";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar(props) {
  const [isActive, setActive] = useState(false);

  const toggleMenu = () => {
    setActive(!isActive);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="bg-primary h-20 px-12 py-5 flex flex-row justify-between items-center fixed z-100 w-full">
      <Link to="/" className="text-white font-bold text-3xl">
        fotonok.<span className="text-highlight">hu</span>
      </Link>
      <div className=" hidden lg:flex flex-row gap-6 items-center font-bold">
        {props.authenticated ? (
          <Link
            to="/changepassword"
            className="text-white relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Beállítások
          </Link>
        ) : null}
        {props.authenticated ? (
          <Link
            to="/notes"
            className="text-white relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Jegyzeteim
          </Link>
        ) : null}
        <div className="w-95">
          <SearchBar value={props.searchValue} onChange={props.searchOnChange} />
        </div>
        <div className="">
          {props.authenticated ? <Button type="primary" text="Kijelentkezés" onClick={handleLogout} /> : (
            <Link to="/login">
              <Button type="primary" text="Bejelentkezés" />
            </Link>
          )
          }
        </div>
      </div>

      <div
        className="flex lg:hidden p-2 flex-col gap-1 cursor-pointer"
        onClick={toggleMenu}
      >
        <div
          className={`w-6 h-0.5 rounded-2xl bg-white transition-all duration-300 ${isActive ? "rotate-45 translate-y-1.5" : ""
            }`}
        ></div>
        <div
          className={`w-6 h-0.5 rounded-2xl bg-white transition-all duration-300 ${isActive ? "opacity-0" : ""
            }`}
        ></div>
        <div
          className={`w-6 h-0.5 rounded-2xl bg-white transition-all duration-300 ${isActive ? "-rotate-45 -translate-y-1.5" : ""
            }`}
        ></div>
      </div>

      <div
        className={`absolute top-20 rounded-b-2xl z-1000 ${props.authenticated ? "h-50" : "h-26"
          } px-5 left-0  w-full  bg-primary flex-col items-center gap-5 text-white transition-all duration-300 ${isActive ? "flex" : "hidden"
          }`}
      >
        <SearchBar value={props.searchValue} onChange={props.searchOnChange} />

        {props.authenticated ? (
          <Link
            to="/changepassword"
            className="text-white relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Beállítások
          </Link>
        ) : null}
        {props.authenticated ? (
          <Link
            to="/notes"
            className="text-white relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Jegyzeteim
          </Link>
        ) : null}

        {props.authenticated ? <Link
          to="/login"
          onClick={handleLogout}
          className="text-white relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        >
          Kijelentkezés
        </Link> : (
          <Link
            to="/login"
            className="text-white relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Bejelentkezés
          </Link>
        )}
      </div>
    </div>
  );
}
export default Navbar;
