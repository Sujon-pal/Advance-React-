import useToggle from "./useToggle";

const ToggleTest = () => {
  const [value, toggleValue] = useToggle();
  const [isopen, toggleIsopen] = useToggle();
  return (
    <div>
      <div>
        <button onClick={toggleValue}>Toggle</button>
        {value && <h1>Toggle Value is True</h1>}
      </div>

      <div>
        <button onClick={toggleIsopen}>Toggle Open</button>
        {isopen && <h1>Toggle Value is True</h1>}
      </div>
    </div>
  );
};

export default ToggleTest;
