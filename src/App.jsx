import "./App.css";
import Header from "./Header";
import { useState } from "react";
import GridLayout from "./GridLayout";
import Footer from "./Footer";
import Interface from "./Interface";

const stardewFish = [
  "Albacore",
  "Anchovy",
  "Angler",
  "Blobfish",
  "Bream",
  "Bullhead",
  "Carp",
  "Catfish",
  "Chub",
  "Clam",
  "Cockle",
  "Crab",
  "Crayfish",
  "Crimsonfish",
  "Dorado",
  "Eel",
  "Flounder",
  "Ghostfish",
  "Glacierfish",
  "Goby",
  "Halibut",
  "Herring",
  "Legend",
  "Lingcod",
  "Lionfish",
  "Lobster",
  "Mussel",
  "Octopus",
  "Oyster",
  "Perch",
  "Periwinkle",
  "Pike",
  "Pufferfish",
  "Salmon",
  "Sandfish",
  "Sardine",
  "Seaweed",
  "Shad",
  "Shrimp",
  "Slimejack",
  "Snail",
  "Squid",
  "Stingray",
  "Stonefish",
  "Sturgeon",
  "Sunfish",
  "Tilapia",
  "Tuna",
  "Walleye",
  "Woodskip",
  "Blue Discus",
  "Cave Jelly",
  "Green Algae",
  "Ice Pip",
  "Largemouth Bass",
  "Lava Eel",
  "Midnight Carp",
  "Midnight Squid",
  "Mutant Carp",
  "Rainbow Trout",
  "Red Mullet",
  "Red Snapper",
  "River Jelly",
  "Scorpion Carp",
  "Sea Cucumber",
  "Sea Jelly",
  "Smallmouth Bass",
  "Spook Fish",
  "Super Cucumber",
  "Tiger Trout",
  "Void Salmon",
  "White Algae",
];

function App() {
  const selectedMap = new Map(stardewFish.map((fish) => [fish, true]));

  const [isSelectedMapState, setIsSelectedMapState] = useState(selectedMap);

  return (
    <>
      <Header />
      <Interface
        selectedState={{ isSelectedMapState, setIsSelectedMapState }}
      />
      <div className="wrapper">
        <GridLayout
          selectedState={{ isSelectedMapState, setIsSelectedMapState }}
        />
      </div>
      <Footer />
    </>
  );
}

export default App;
