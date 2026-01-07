import Button from "./Button";
function Card(props) {
  return (
    <div className=" border-2 border-primary rounded-xl w-62.5 overflow-hidden">
      <img src={props.src} alt="" />
      <div className="bg-primary text-white p-5">
        <h2 className="border-b-highlight border-b-2 w-fit pe-2">{props.title}</h2>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <p>{props.desc}</p>
        <h1>{props.price}</h1>
        <Button type="main" text="Vásárlás" />
      </div>
    </div>
  );
}
export default Card;
