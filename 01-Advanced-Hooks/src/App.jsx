import "./App.css";
import Form from "./component/CustomHooks/Form";

import ToggleTest from "./component/CustomHooks/ToggleTest";
import User from "./component/CustomHooks/User";
import Useeffect from "./component/useEffect/Useeffect";
import UseMemo from "./component/useMemo/UseMemo";
import UseReducer from "./component/useReducer/UseReducer";
import UseRef from "./component/useRef/UseRef";
function App() {
  return (
    <div>
      {/* <Useeffect></Useeffect> */}
      {/* <UseMemo></UseMemo> */}
      {/* <UseRef></UseRef> */}
      {/* <UseReducer></UseReducer> */}

      <ToggleTest></ToggleTest>

      <User />
   <Form></Form>
    </div>
  );
}

export default App;
