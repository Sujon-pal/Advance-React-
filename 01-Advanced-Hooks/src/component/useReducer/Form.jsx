
import { useReducer } from "react";

const Form = () => {
  const reducer = (state, action) => {
    return {
      ...state,
      [action.name]: action.value,
    };
  };

  const [formData, dispatch] = useReducer(reducer, {
    userName: "",
    email: "",
  });

  const handleChange = (e) => {
    dispatch({
      name: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <form>
      <input
        type="text"
        name="userName"
        placeholder="Enter User Name"
        value={formData.userName}
        onChange={handleChange}
      />

      <input
        type="text"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
      />

      <p>
        {formData.userName} - {formData.email}
      </p>
    </form>
  );
};

export default Form;

