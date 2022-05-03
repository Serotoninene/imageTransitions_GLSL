// Components
import CanvasContainer from "./Three/ThreeElements/CanvasContainer";
import Scene1 from "./Three/ThreeScenes/Scene1";
import Scene2 from "./Three/ThreeScenes/Scene2";
// React Router
import { Routes, Route } from "react-router";
import { NavLink } from "react-router-dom";
// Styling
import "./Scss/style.scss";

const ImgTransition1 = () => (
  <CanvasContainer>
    <Scene1 />
  </CanvasContainer>
);

const ImgTransition2 = () => (
  <CanvasContainer>
    <Scene2 />
  </CanvasContainer>
);

function App() {
  return (
    <div className="App">
      <div className="Navbar flex justify-start">
        <NavLink to="/">Scene 1</NavLink>
        <NavLink to="/scene2">Scene 2</NavLink>
        <NavLink to="/scene3">Scene 3</NavLink>
      </div>
      <Routes>
        <Route path="/" element={<ImgTransition1 />} />
        <Route path="/scene2" element={<ImgTransition2 />} />
      </Routes>
    </div>
  );
}

export default App;
