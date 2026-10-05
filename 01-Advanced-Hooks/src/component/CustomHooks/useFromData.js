import { useState } from "react";

export default function useFromData(initialvalue = {}, callback) {
  const [values, setValue] = useState(initialvalue);

  // Handle input change

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValue((pre) => ({ ...pre, [name]: value }));
  };

  //   handle submit

  const handleSubmit = (e) => {
    e.preventDefault();
    if (callback) callback(values);
  };

  //    reset
  const handleReset = () => {
    setValue(initialvalue);
  };


  return {
    values,
    handleInputChange,
    handleSubmit,
    handleReset
  }
}
