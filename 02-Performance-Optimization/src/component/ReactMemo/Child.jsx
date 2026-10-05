import { memo } from "react";

const Child = memo(({ name }) => {
    
  console.log("Child Rendered");

  return <h2>Hello, {name}</h2>;
});

export default Child;