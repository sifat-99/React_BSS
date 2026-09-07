import { use } from "react";
import { useActionState } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Sumbit from "./Submit";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);

  async function shareOpinion(prevState, formData) {
    // event.preventDefault();
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    let errors = [];

    if (userName.trim() === "") {
      errors.push("Please enter your name");
    }
    if (title.trim() === "") {
      errors.push("Please enter a title");
    }
    if (body.trim() === "") {
      errors.push("Please enter your opinion");
    }

    if (errors.length > 0) {
      return { errors, enteredValues: { userName, title, body } };
    }
    // Submit data to server
    await addOpinion({
      title,
      body,
      userName,
    });
    return { errors: null };
  }

  const [formState, formAction] = useActionState(shareOpinion, {
    errors: null,
    hasData: false,
  });

  const { errors } = formState;

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <Sumbit />
      </form>
    </div>
  );
}
