function Button(props) {
  if (props.type === "primary") {
    return (
      <>
        <button className="bg-secondary text-light py-2 px-3 rounded-2xl w-full">
          {props.text}
        </button>
      </>
    );
  }
  if (props.type === "main") {
    return (
      <a 
        href={props.href}
        className="bg-secondary text-white py-2 px-3 rounded-2xl inline-block w-full text-center cursor-pointer hover:bg-primaryHover transition-all"
      >
        {props.text}
      </a>
    );
  }

  return (
    <>
      <button>{props.text}</button>
    </>
  );
}
export default Button;
