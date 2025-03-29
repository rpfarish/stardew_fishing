import "./App.css";
import Header from "./Header";
import { useState } from "react";
import GridLayout from "./GridLayout";
import Footer from "./Footer";
import Interface from "./Interface";
import stardewFish from "./stardewFish";

function App() {
  const selectedMap = new Map(stardewFish.map((fish) => [fish, true]));

  const [isSelectedMapState, setIsSelectedMapState] = useState(selectedMap);

  return (
    <>
      <Header />
      <Interface
        selectedState={{ isSelectedMapState, setIsSelectedMapState }}
      />
      <GridLayout
        selectedState={{ isSelectedMapState, setIsSelectedMapState }}
      />
      <Footer />
    </>
  );
}

export default App;
