import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Card from "../components/Card";
const NotesPage = (props) => {
  return (
    <div className="flex flex-col min-h-screen justify-between gap-3 w-full overflow-x-hidden">
      <Navbar authenticated={props.authenticated} />
      <div className="flex flex-col justify-center items-center gap-7">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold">Jegyzeteim</h1>
          <div className="bg-highlight h-1 mt-1 rounded-2xl w-[50%]"></div>
        </div>
        <div className="sm:w-150 flex gap-5 flex-col">
          <Card type="note" title="aasd" size="12Tb" />
          <Card type="note" title="aasd" size="12Tb" />
          <Card type="note" title="aasd" size="12Tb" />
          <Card type="note" title="aasd" size="12Tb" />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default NotesPage;
