import { useFormStatus } from "react-dom";

function Sumbit() {
  const { pending } = useFormStatus();

  return (
    <p className="action">
      <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>
    </p>
  );
}

export default Sumbit;
