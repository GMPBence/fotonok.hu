function Input(props) {
  if (props.color === "light") {
    return (
      <div>
        <input
          type="text"
          className="bg-input-light text-[#828282] px-4 py-2 text-xl font-bold rounded-md w-full"
          placeholder={props.type}
        />
      </div>
    );
  } else if (props.inputType === "auth") {
    return (
      <div>
        <input
          value={props.value}
          onChange={props.onChange}
          type={props.type}
          className="bg-input-gray text-[hsl(0,0%,70%)] px-4 py-2 text-xl font-bold rounded-md w-full"
          placeholder={props.placeholder}
        />
      </div>
    );
  } else {
    return (
      <div>
        <input
          value={props.value}
          onChange={props.onChange}
          type={props.type}
          className="bg-input-dark placeholder:text-[#ffff] text-[#ffffff] text-opacity-1 px-4 py-2 text-xl font-bold rounded-md w-full outline-0"
          placeholder={props.placeholder}
        />
      </div>
    );
  }
}
export default Input;
