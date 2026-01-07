function Button(props) {
  if (props.type === "primary") {
    return (
      <>
        <button className="bg-secondary text-light py-2 px-3 rounded-2xl w-full">{props.text}</button>
      </>
    );
  }
  return (
    <>
      <button>{props.text}</button>
    </>
  );
}
export default Button;
