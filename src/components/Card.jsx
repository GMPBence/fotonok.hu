import Button from "./Button";
import listImage from "../assets/images/list-image.png";

function Card(props) {
  const items = props.content;
  return (
    <div className=" border-2 border-primary rounded-xl w-62.5 overflow-hidden">
      <img src={props.src} alt="" />
      <div className="bg-primary text-white p-5">
        <h2 className="border-b-highlight border-b-2 w-fit pe-2 mb-3">
          {props.title}
        </h2>
        <ul className="ml-5" style={{ listStyle: "none", paddingLeft: "0" }}>
          {items.map((item, index) => (
            <li
              key={index}
              className="text-sm"
              style={{
                backgroundImage: `url(${listImage})`,
                backgroundSize: "10px 10px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 4px",
                paddingLeft: "12px",
              }}
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm mt-2">{props.desc}</p>
        <h1 className="text-center my-2">Ár: {props.price} Ft</h1>
        <Button type="main" text="Vásárlás" />
      </div>
    </div>
  );
}
export default Card;
