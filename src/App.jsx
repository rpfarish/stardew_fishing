import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import GridLayout from "./GridLayout";
import Footer from "./Footer";
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <GridLayout />
      <Footer />
    </>
  );
}

export default App;
