function Input(props) {
  return (
    <div>
      <input type="text" className="bg-input-gray text-[hsl(0,0%,70%)] px-4 py-2 text-xl font-bold rounded-xl w-full" placeholder={props.type} />
    </div>
  );
}
export default Input;
