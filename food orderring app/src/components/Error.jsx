export function Error({ title, message }) {
  return (
    <div className="w-[90%] max-w-[25rem] my-8 mx-auto p-4 bg-error-surface text-error-text rounded-md">
      <h2 className="m-0 font-bold text-xl">{title}</h2>
      <p className="m-0">{message}</p>
    </div>
  );
}
