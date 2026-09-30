import { useReducer } from "react";
import Counter from "./Counter";
import Form from "./Form";

const UseReducer = () => {
  const [checked, toggle] = useReducer((checked) => !checked, false);
  return (
    <div>
      <h1>useReducer </h1>

      <input type="checkbox" checked={checked} onClick={toggle} />
      {checked ? "Checked" : "Not Checked"}
      <Counter></Counter>
      <Form></Form>
    </div>
  );
};

export default UseReducer;
