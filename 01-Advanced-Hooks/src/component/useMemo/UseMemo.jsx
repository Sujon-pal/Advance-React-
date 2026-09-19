import { useMemo } from "react";
import { useState } from "react";

const UseMemo = () => {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState(1)
  const handleValue = () => {
    setCount(count + 1);
  };
  const expensiveTask = (num) => {
    console.log("inside expensive task!!");
    for (let i = 0; i <= 1000000000; i++) {''}
    return num * 2;
  };

//   let doubleValue = expensiveTask(input);
    let doubleValue = useMemo(()=> expensiveTask(input),[input]);
  return (
    <div>
      <div>
        <button onClick={handleValue}>Increment</button>
        <h4>Total Value : {count}</h4>
      </div>
      <div>
        <input
         type="number"
         value={input}
         onChange={(e)=> setInput(e.target.value)} 
        
        />
      </div>
      <div>
        <h4>Double Value : {doubleValue}</h4>
      </div>
    </div>
  );
};

export default UseMemo;
