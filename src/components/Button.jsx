function Button(props) {
  if (props.type === "primary") {
    return (
      <>
        <button className="bg-secondary  py-2 px-15 rounded-2xl flex items-center justify-center w-full text-center cursor-pointer hover:bg-primaryHover transition-all text-white">
          {props.text}
        </button>
      </>
    );
  }
  if (props.type === "main") {
    return (
      <a
        href={props.href}
        className="bg-secondary  text-white py-2 px-3 rounded-2xl flex items-center justify-center w-full text-center cursor-pointer hover:bg-primaryHover transition-all"
      >
        {props.text}
      </a>
    );
  }

  if (props.type === "how") {
    return (
      <a
        href={props.href}
        className="bg-button-light border-2  border-secondary text-white py-2 px-7 rounded-2xl flex items-center justify-center w-full text-center cursor-pointer hover:bg-primaryHover transition-all"
      >
        {props.text}
      </a>
    );
  }
  if (props.type==="login"){
    return(
      <button className="text-white py-2 text-center border-white border rounded-xl bg-input-gray font-bold ">{props.text}</button>
    )
  }

  return (
    <>
      <button>{props.text}</button>
    </>
  );
}
export default Button;
