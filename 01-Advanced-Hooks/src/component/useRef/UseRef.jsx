import { useEffect, useRef, useState } from "react";
import StopWatch from "./StopWatch";

const UseRef = () => {
  const [count, setCount] = useState(0);
  let value = useRef(0);
  let btnref = useRef();

  const handleCount = () => {
    value.current = value.current + 1;
    console.log(value.current);
    setCount(count + 1);
  };

  const handleColorChage = () => {
    btnref.current.style.backgroundColor = "red";
  };
  useEffect(() => {
    console.log("run every render");
  });
  return (
    <div>
      <button ref={btnref} onClick={handleCount}>
        Increment :{" "}
      </button>
      <br />
      <button onClick={handleColorChage}>
        Change color of Increment Button
      </button>
      <h4> Value : {count}</h4>
      
      <StopWatch></StopWatch>
    </div>
  );
};

export default UseRef;
