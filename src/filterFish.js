import fishData from "./fish.json";

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

const allSeasons = ["Spring", "Summer", "Fall", "Winter"];
export default function filterFishByCircularSeasons(
  fishData,
  allSeasons,
  startSeason,
) {
  let results = [];
  let remainingFish = [...Object.values(fishData)]; // Start with all fish

  let startIndex = allSeasons.indexOf(startSeason);
  if (startIndex === -1) {
    throw new Error(`Start season "${startSeason}" not found in allSeasons.`);
  }

  for (let i = 0; i < allSeasons.length; i++) {
    let season = allSeasons[(startIndex + i) % allSeasons.length];
    // Add this before the loop to see what's causing the issue
    console.log(
      "Fish with missing Season:",
      remainingFish.filter((fish) => !fish.Season),
    );
    let filteredFish = remainingFish.filter(
      (fish) =>
        fish.Season.includes(season) || fish.Season.includes("All Seasons"),
    );

    results.push(filteredFish);
    remainingFish = remainingFish.filter(
      (fish) => !filteredFish.includes(fish),
    );
  }

  let springIndex = allSeasons.indexOf("Spring");
  let shiftAmount =
    (springIndex - startIndex + allSeasons.length) % allSeasons.length;
  results = results.slice(shiftAmount).concat(results.slice(0, shiftAmount));

  return results;
}
