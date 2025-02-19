import React from "react";

const stardewFish = [
  "Anchovy",
  "Angler",
  "Arowana",
  "Arctic Char",
  "Ash Fish",
  "Bass",
  "Blue Discus",
  "Bluegill",
  "Bream",
  "Brown Trout",
  "Bullhead",
  "Carp",
  "Catfish",
  "Chub",
  "Clownfish",
  "Coelacanth",
  "Copper Bar",
  "Creepy Fish",
  "Crimsonfish",
  "Dorado",
  "Eel",
  "Emperor Fish",
  "Escargot",
  "Fairy Rose",
  "Fish Taco",
  "Flounder",
  "Gar",
  "Goldfish",
  "Green Algae",
  "Herring",
  "Ice Pip",
  "Iridium Fish",
  "Jellyfish",
  "Largemouth Bass",
  "Lava Eel",
  "Lobster",
];

const GridLayout = () => {
  return (
    <div className="grid-container">
      {stardewFish.sort().map((fish, index) => (
        <div key={index} className="grid-item">
          {fish}
        </div>
      ))}
    </div>
  );
};

export default GridLayout;
