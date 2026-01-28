function Button(props) {
  if (props.type === "primary") {
    return (
      <>
        <button onClick={props.onClick} className="bg-secondary  py-2 px-15 rounded-2xl flex items-center justify-center w-full text-center cursor-pointer hover:bg-primaryHover transition-all hover:scale-105 text-white">
          {props.text}
        </button>
      </>
    );
  }
  if (props.type === "main") {
    return (
      <a
        href={props.href}
        className="bg-secondary  text-white py-2 px-3 rounded-2xl flex items-center justify-center w-full text-center cursor-pointer hover:bg-primaryHover transition-all hover:scale-105"
      >
        {props.text}
      </a>
    );
  }

  if (props.type === "how") {
    return (
      <a
        href={props.href}
        className="bg-button-light border-2  border-secondary text-white py-2 px-7 rounded-2xl flex items-center justify-center w-full text-center cursor-pointer hover:bg-primaryHover transition-all hover:scale-105"
      >
        {props.text}
      </a>
    );
  }
  if (props.type === "login") {
    return (
      <button className="text-white py-2 text-center border-white border rounded-xl bg-input-gray font-bold hover:bg-white hover:text-black transition-all hover:scale-105 w-full cursor-pointer" onClick={props.onClick}>
        {props.text}
      </button>
    );
  }
  if (props.type === "save") {
    return <button onClick={props.onClick} className="bg-input-light text-[#828282]  px-4 py-2 text-xl font-bold rounded-md w-full cursor-pointer hover:bg-[#a5a5a5] hover:text-white transition-all hover:scale-105">{props.text}</button>;
  }
  if (props.type === "billing") {
    return (
      <div className="flex flex-row rounded-xl overflow-hidden">
        <label htmlFor="recipt1">
          <input 
            type="radio" 
            name="recipt" 
            id="recipt1" 
            className="hidden peer" 
            defaultChecked 
            onChange={() => props.onChange("recipt1")}
          />
          <div className="bg-input-light text-[#828282] text-xl font-bold peer-checked:bg-input-dark peer-checked:text-white py-3 px-10 cursor-pointer">Nyugta</div>
        </label>
        <label htmlFor="recipt2">
          <input 
            type="radio" 
            name="recipt" 
            id="recipt2" 
            className="hidden peer" 
            onChange={() => props.onChange("recipt2")}
          />
          <div className="bg-input-light text-[#828282] text-xl font-bold peer-checked:bg-input-dark peer-checked:text-white py-3 px-10 cursor-pointer">Számla</div>
        </label>
      </div>
    );
  }
  return (
    <>
      <button>{props.text}</button>
    </>
  );
}
export default Button;
