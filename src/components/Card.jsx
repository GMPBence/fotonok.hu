import Button from "./Button";
import listImage from "../assets/images/list-image.png";
import api from "../app/api";
import { useLoading } from "../context/LoadingContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Card(props) {
  const { setIsLoading } = useLoading()
  const navigate = useNavigate();
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

  const handleClaim = async (noteId) => {
    setIsLoading(true)
    try {
      const res = await api.get("/plans/claim?id=" + noteId);
      setIsLoading(false)
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Sikeres beszerzés',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          navigate("/notes");
        }, 1500);
      }
    } catch (err) {
      setIsLoading(false)
      if (err?.response?.data?.error === "user_already_has_plan") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a beszerzés során',
          text: 'Te már beszerezted ezt a jegyzetet',          
          showConfirmButton: true
        })
      } else if (err?.response?.data?.error === "note_not_found") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a beszerzés során',
          text: 'A jegyzet nem található',          
          showConfirmButton: true
        })
      } else if (err?.response?.data?.error === "user_not_found") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a beszerzés során',
          text: 'A felhasználó nem találhato',          
          showConfirmButton: true
        })
      } else if(err?.response?.data?.error === "missing_data") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a beszerzés során',
          text: 'A jegyzet azonosítója nincs megadva',          
          showConfirmButton: true
        })
      } else if (err?.response?.data?.error === "internal") {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a beszerzés során',
          text: 'Szerverhiba, próbáld meg késöbb',          
          showConfirmButton: true
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Hiba történt a beszerzés során',
          text: err?.response?.data?.error,          
          showConfirmButton: true
        })
      }
    }
  }

  if (props.type === "big") {
    const items = props.content;
    return (
    <div className="border-3 border-primary rounded-xl w-full h-full max-w-[300px]overflow-hidden relative hover:scale-105 transition-all hover:border-[#FE6A01] flex flex-col">

      {(props.popular || props.new) && (
        <div className="absolute top-3 left-3 flex flex-row gap-2 z-10">
          {props.new && (
            <div className="bg-[#2bb900]   rounded-2xl px-5 py-2 text-white text-xs whitespace-nowrap">
              Új
            </div>
          )}
          {props.popular && (
            <div className="bg-[#FE6A01] rounded-2xl px-5 py-2 text-white text-xs whitespace-nowrap">
              Népszerű
            </div>
          )}
          {props.free && (
            <div className="bg-[#0059ff] rounded-2xl px-5 py-2 text-white text-xs whitespace-nowrap">
              Ingyenes
            </div>
          )}
        </div>
      )}


      <img src={`https://fotonok.hu/img/${props.src}`} className="shrink-0 w-full 
    h-40 
    object-cover 
    rounded-t-xl" />

      <div className="bg-primary flex-1 flex flex-col text-white p-5">
        <h2 className="border-b-highlight border-b-2 w-fit pe-2 mb-3 font-bold">
          {props.title}
        </h2>

        <ul className="list-none p-0">
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
        </ul>

        <p className="text-sm mt-2">{props.desc}</p>

        <div className="flex flex-col w-full mt-auto">
          <h3 className="text-center my-2 font-bold">
            {
              props.free ? (
                "Ingyenes"
              ) : (
                `Ár: ${props.price} Ft`
              )
            }
          </h3>
          {props.free ? (
            <Button type="primary" text="Beszerzés" onClick={handleClaim.bind(this, props.noteId)} />
          ) : (
            (
            <Button
              href={`/payment?id=${props.noteId}`}
              type="main"
              text="Vásárlás"
            />
          )
          )}
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
      <div id={props.id} className="bg-primary rounded-xl text-white flex flex-col sm:flex-row justify-between p-5 items-center w-full">
        <h1>{props.title}</h1>
        <div className="flex  flex-col   sm:flex-row items-center gap-3">
          <p className="sm:w-30 text-center w-full">{props.size}</p>
          <Button type="primary" text="Letöltés" onClick={handleDownload.bind(this, props.id)} />
        </div>
      </div>
    );
  }
  if (props.type === "payment") {
    const items = props.content;
    return (
      <div className=" border-3 border-primary rounded-xl w-[300px] overflow-hidden relative hover:scale-105 transition-all hover:border-[#FE6A01]">
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
        <img src={`https://fotonok.hu/img/${props.src}`} alt="" />
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
