import { useEffect, useState } from "react";

const Useeffect = () => {
  const [count, setCount] = useState(0);
  function handleCounter() {
    setCount(count + 1);
  }

  // First -> Side Effect functin
  // Second ->  Cleanup function (returning a function)
  // Third -> Dependency array

  // 📌 Variation : 1
  // Run every render ->
  //   useEffect(() => {
  //     alert("Run every render");
  //   });

  //   📌 Variation : 2

  

  return (
    <div>
      <h1> useEffect </h1>

      <div>
        <button onClick={handleCounter}>Click</button>
        <br />
        <h1>Value : {count}</h1>
      </div>
    </div>
  );
};

export default Useeffect;
