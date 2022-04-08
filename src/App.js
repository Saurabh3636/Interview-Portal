import "./App.css";
//import One from "./components/One";

//import Three from "./components/Three";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Two from "./Components/Two";
import Test from "./Components/Test";
import Final from "./Components/Final";
function App() {
  return (
    <div className="App">
      {/* <One /> */}
      {/* <Two /> */}
      {/* <Three /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Two />} />
          <Route path="/Test/:id/*" element={<Test />} />
          <Route path="/Final" element={<Final />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
