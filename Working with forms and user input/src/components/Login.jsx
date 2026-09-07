import { useState } from "react";

export default function Login() {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const emailIsInvalid = didEdit.email && !value.email.includes("@");
  const passwordIsInvalid = didEdit.password && value.password.length < 6;

  function handleSubmit(e) {
    e.preventDefault();
    console.log(value);
  }
  function handleReset() {
    setValue({
      email: "",
      password: "",
    });
  }
  function handleChange(identifire, event) {
    setValue((prevValue) => ({
      ...prevValue,
      [identifire]: event.target.value,
    }));
    setDidEdit((prevDidEdit) => ({
      ...prevDidEdit,
      [identifire]: false,
    }));
  }

  function handleBlur(identifire) {
    setDidEdit((prevDidEdit) => ({
      ...prevDidEdit,
      [identifire]: true,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={(event) => handleChange("email", event)}
            onBlur={() => handleBlur("email")}
          />
          {emailIsInvalid && (
            <p className="control-error">Please enter a valid email</p>
          )}
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) => handleChange("password", event)}
          />
        </div>
      </div>

      <p className="form-actions">
        <button
          type="button"
          className="button button-flat"
          onClick={handleReset}
        >
          Reset
        </button>
        <button type="submit" className="button">
          Login
        </button>
      </p>
    </form>
  );
}
