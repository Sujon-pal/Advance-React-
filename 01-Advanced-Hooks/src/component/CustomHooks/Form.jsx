
import useFromData from "./useFromData";

const Form = () => {
  const initialValue = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    console.log("Form Submitted:", values);
  };

  const {
    values,
    handleInputChange,
    handleSubmit,
    handleReset,
  } = useFromData(initialValue, onSubmit);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login Form</h2>

      <br />

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={values.email}
        onChange={handleInputChange}
      />

      <br />

      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={values.password}
        onChange={handleInputChange}
      />

      <br />

      <button type="submit">Submit</button>

      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
};

export default Form;
