export default function Input({ label, id, ...props }) {
  return (
    <p className="flex flex-col my-2">
      <label htmlFor={id} className="font-bold mb-2">
        {label}
      </label>
      <input
        id={id}
        name={id}
        required
        className="w-full max-w-[20rem] font-inherit p-2 rounded-[4px] border border-border-light text-black"
        {...props}
      />
    </p>
  );
}
