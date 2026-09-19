import { useEffect, useState } from "react";

const Useeffect = () => {
  const [count, setCount] = useState(0);
  const [total, setTotal]= useState(1)
  function handleCounter() {
    setCount(count + 1);
  }

  function handleTotal(){
    setTotal(total + 1)
  }

  // First -> Side Effect functin
  // Second ->  Cleanup function (returning a function)
  // Third -> Dependency array

  // 📌 Variation : 1
  // Run every render ->
  //   useEffect(() => {
  //     alert("Run every render");
  //   });

  // 📌 Variation : 2
  // That runs on only first render 

  // useEffect(()=>{
  //   alert("I will  runs on only first render")
  // },[])

  // 📌 Variation : 3
  // useEffect(()=>{
  //   alert("I will  runs every time when count is updated ")
  // },[count] )

   // 📌 Variation : 3
  //  Multiple Dependencies
  useEffect(()=>{
    alert("I will  runs every time when count/total is updated ")
  },[count,total] )

  return (
    <div>
      <h1> useEffect </h1>

      <div>
        <button onClick={handleCounter}>Update Count</button>
        <br />
        <h1>Count  : {count}</h1>
      </div>
       <div>
        <button onClick={handleTotal}>Update Total </button>
        <br />
        <h1>Total : {total}</h1>
      </div>
    </div>
  );
};

export default Useeffect;
