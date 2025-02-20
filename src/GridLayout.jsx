import React from "react";

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
// select all, clear all
const GridLayout = () => {
  return (
    <div className="grid-container">
      {stardewFish.sort().map((fish, index) => (
        <div key={index} className="grid-item">
          <div className="inner-grid">
            <img src={`./src/assets/all_fish/${fish}.jpg`} alt={fish} />
            <p className="fish-name">{fish}</p>{" "}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridLayout;
