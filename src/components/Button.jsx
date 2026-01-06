function Button(props) {
  if (props.type === "primary") {
    return (
      <>
        <button className="bg-amber-500">{props.text}</button>
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
