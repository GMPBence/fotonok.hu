function Input(props) {
  if (props.color === "light") {
    return (
      <div>
        <input
          type="text"
          className="bg-[#E7E7E7] text-[#828282] px-4 py-2 text-xl font-bold rounded-md w-full"
          placeholder={props.type}
        />
      </div>
    );
  } else {
    return (
      <div>
        <input
          type="text"
          className="bg-input-gray text-[hsl(0,0%,70%)] px-4 py-2 text-xl font-bold rounded-md w-full"
          placeholder={props.type}
        />
      </div>
    );
  }
}
export default Input;
