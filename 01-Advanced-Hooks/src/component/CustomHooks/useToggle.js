import { useState } from "react";

export default function useToggle(initialValue = false) {
  const [value, setvalue] = useState(initialValue);

  const toggleValue = () => setvalue((prevValue) => !prevValue);

  return [value, toggleValue];
}
