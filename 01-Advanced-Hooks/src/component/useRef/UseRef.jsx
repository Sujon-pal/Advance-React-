import { useEffect, useRef, useState } from "react";

const UseRef = () => {
  const [count, setCount] = useState(0);
  let value = useRef(0);

  const handleCount = () => {
    value.current = value.current + 1;
    console.log(value.current);
    setCount(count + 1);
  };
  useEffect(() => {
    console.log("run every render");
  });
  return (
    <div>
      <button onClick={handleCount}>Increment : </button>
      <h4> Value : {count}</h4>
    </div>
  );
};

export default UseRef;
