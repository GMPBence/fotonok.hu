import Button from "./Button";
import listImage from "../assets/images/list-image.png";
import api from "../app/api";
import { useLoading } from "../context/LoadingContext";
import Swal from "sweetalert2";

function Card(props) {
  const { setIsLoading } = useLoading()
  const handleDownload = async (noteId) => {
    setIsLoading(true)
    try {
      const res = await api.get("/plans/download?id=" + noteId, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'jegyzet.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      setIsLoading(false)
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Sikeres letöltés',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (err) {
      setIsLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Hiba a jegyzet letöltéskor',
        text: err?.response?.data?.error,
        showConfirmButton: true
      })
    }
  }

  if (props.type === "big") {
    const items = props.content;
    return (
      <div className="border-3 border-primary rounded-xl w-62.5 h-115 overflow-hidden relative hover:scale-105 transition-all hover:border-[#FE6A01] flex flex-col">
        {props.popular === true && (
          <div className="bg-[#FE6A01] font-bowlby rounded-2xl absolute top-3 left-3 px-5 py-2 text-white text-xs font-extralight">
            Népszerű
          </div>
        )}
        {props.new === true && (
          <div className="bg-[#FE6A01] font-bowlby rounded-2xl absolute top-3 left-3 px-5 py-2 text-white text-xs font-extralight">
            Új
          </div>
        )}
        <img src={props.src} alt="" className="shrink-0" />
        <div className="bg-primary flex-1 flex flex-col text-white p-5">
          <h2 className="border-b-highlight border-b-2 w-fit pe-2 mb-3 font-bold">
            {props.title}
          </h2>
          <div className="" style={{ listStyle: "none", paddingLeft: "0" }}>
            {items.map((item, index) => (
              <li
                key={index}
                className="text-sm"
                style={{
                  backgroundImage: `url(${listImage})`,
                  backgroundSize: "7px 7px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "0 6px",
                  paddingLeft: "12px",
                }}
              >
                {item}
              </li>
            ))}
          </div>
          <p className="text-sm mt-2">{props.desc}</p>
          <div className="flex flex-col w-full mt-auto">
            <h1 className="text-center my-2 font-bold">Ár: {props.price} Ft</h1>
            <Button href={"/payment?id=" + props.noteId} type="main" text="Vásárlás" />
          </div>
        </div>
      </div>
    );
  }
  if (props.type === "small") {
    return (
      <div className="bg-primary w-62.5 rounded-xl px-10 py-5 text-center text-white hover:-translate-y-5 transition-all hover:border-[#FE6A01]">
        <h2 className="border-b-highlight border-b-2 pb-2 mb-3">
          {props.title}
        </h2>
        <p className="font-bold">{props.content}</p>
      </div>
    );
  }
  if (props.type === "note") {
    return (
      <div id={props.id} className="bg-primary rounded-xl text-white flex flex-row justify-between p-7 items-center w-full">
        <h1>{props.title}</h1>
        <div className="flex flex-row items-cente gap-3">
          <p className="w-30  flex flex-row items-center">{props.size}</p>
          <Button type="primary" text="Letöltés" onClick={handleDownload.bind(this, props.id)} />
        </div>
      </div>
    );
  }
  if (props.type === "payment") {
    const items = props.content;
    return (
      <div className=" border-3 border-primary rounded-xl w-62.5 overflow-hidden relative hover:scale-105 transition-all hover:border-[#FE6A01]">
        {props.popular === true && (
          <div className="bg-[#FE6A01] font-bowlby rounded-2xl absolute top-3 left-3 px-5 py-2 text-white text-xs font-extralight">
            Népszerű
          </div>
        )}
        {props.new === true && (
          <div className="bg-[#FE6A01] font-bowlby rounded-2xl absolute top-3 left-3 px-5 py-2 text-white text-xs font-extralight">
            Új
          </div>
        )}
        <img src={props.src} alt="" />
        <div className="bg-primary h-full text-white p-5 ">
          <h2 className="border-b-highlight border-b-2 w-fit pe-2 mb-3 font-bold">
            {props.title}
          </h2>
          <div className="" style={{ listStyle: "none", paddingLeft: "0" }}>
            {items.map((item, index) => (
              <li
                key={index}
                className="text-sm"
                style={{
                  backgroundImage: `url(${listImage})`,
                  backgroundSize: "7px 7px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "0 6px",
                  paddingLeft: "12px",
                }}
              >
                {item}
              </li>
            ))}
          </div>
          <p className="text-sm mt-2">{props.desc}</p>
        </div>
      </div>
    );
  }
}
export default Card;
