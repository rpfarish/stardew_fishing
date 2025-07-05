import React, { useState, ChangeEvent } from "react";
import { inflate } from "pako";

interface FishData {
  name: string;
  count: number;
}

interface FishCaughtData {
  [key: string]: FishData;
}

const StardewFishParser = ({ handleFileLoad }) => {
  const [fishCaught, setFishCaught] = useState<FishCaughtData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const fishData = {
    128: "Pufferfish",
    129: "Anchovy",
    130: "Tuna",
    131: "Sardine",
    132: "Bream",
    136: "Largemouth Bass",
    137: "Smallmouth Bass",
    138: "Rainbow Trout",
    139: "Salmon",
    140: "Walleye",
    141: "Perch",
    142: "Carp",
    143: "Catfish",
    144: "Pike",
    145: "Sunfish",
    146: "Red Mullet",
    147: "Herring",
    148: "Eel",
    149: "Octopus",
    150: "Red Snapper",
    151: "Squid",
    152: "Seaweed",
    153: "Green Algae",
    154: "Sea Cucumber",
    155: "Super Cucumber",
    156: "Ghostfish",
    157: "White Algae",
    158: "Stonefish",
    159: "Crimsonfish",
    160: "Angler",
    161: "Ice Pip",
    162: "Lava Eel",
    163: "Legend",
    164: "Sandfish",
    165: "Scorpion Carp",
    167: "Joja Cola",
    168: "Trash",
    169: "Driftwood",
    170: "Broken Glasses",
    171: "Broken CD",
    172: "Soggy Newspaper",
    267: "Flounder",
    269: "Midnight Carp",
    372: "Clam",
    682: "Mutant Carp",
    698: "Sturgeon",
    699: "Tiger Trout",
    700: "Bullhead",
    701: "Tilapia",
    702: "Chub",
    704: "Dorado",
    705: "Albacore",
    706: "Shad",
    707: "Lingcod",
    708: "Halibut",
    715: "Lobster",
    716: "Crayfish",
    717: "Crab",
    718: "Cockle",
    719: "Mussel",
    720: "Shrimp",
    721: "Snail",
    722: "Periwinkle",
    723: "Oyster",
    734: "Woodskip",
    775: "Glacierfish",
    795: "Void Salmon",
    796: "Slimejack",
    798: "Midnight Squid",
    799: "Spook Fish",
    800: "Blobfish",
    836: "Stingray",
    837: "Lionfish",
    838: "Blue Discus",
    898: "Son of Crimsonfish",
    899: "Ms. Angler",
    900: "Legend II",
    901: "Radioactive Carp",
    902: "Glacierfish Jr.",
    SeaJelly: "Sea Jelly",
    CaveJelly: "Cave Jelly",
    RiverJelly: "River Jelly",
    Goby: "Goby",
  };

  const ignoreList = {
    308: 1,
    79: 1,
    797: 1,
    191: 1,
    103: 1,
    73: 1,
    842: 1,
    821: 1,
    825: 1,
    890: 1,
    388: 1,
    390: 1,
    2332: 1,
    2334: 1,
    2396: 1,
    2418: 1,
    2419: 1,
    2421: 1,
    2423: 1,
    2425: 1,
    2427: 1,
    2732: 1,
    2814: 1,
    393: 1,
    78: 1,
  };

  const parseStardewFish = async (file: File) => {
    setLoading(true);
    setError("");
    setFileName(file.name);

    try {
      const saveCompressed = file.size < 512000;
      let xmlContent: string;

      if (saveCompressed) {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        xmlContent = inflate(uint8Array, { to: "string" });
      } else {
        xmlContent = await file.text();
      }

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, "text/xml");

      const parseError = xmlDoc.querySelector("parsererror");
      if (parseError) {
        throw new Error("XML parsing failed: " + parseError.textContent);
      }

      const fishCaughtData: FishCaughtData = {};
      const players = xmlDoc.querySelectorAll("farmhand, SaveGame > player");

      players.forEach((player) => {
        const fishCaughtItems = player.querySelectorAll("fishCaught > item");

        fishCaughtItems.forEach((item) => {
          const keyElement = item.querySelector("key");
          const valueElement = item.querySelector("value > ArrayOfInt > int");

          if (
            keyElement &&
            valueElement &&
            keyElement.textContent &&
            valueElement.textContent
          ) {
            let rawId = keyElement.textContent.trim();
            const count = parseInt(valueElement.textContent) || 0;

            let fishId = rawId;
            const parenIndex = rawId.indexOf(")");
            if (parenIndex > -1) {
              fishId = rawId.substring(parenIndex + 1);
            }

            if (count > 0 && !ignoreList[fishId]) {
              if (!fishCaughtData[fishId]) {
                fishCaughtData[fishId] = {
                  name: fishData[fishId] || `Unknown Fish (${fishId})`,
                  count: 0,
                };
              }
              fishCaughtData[fishId].count += count;
            }
          }
        });
      });

      setFishCaught(fishCaughtData);
      handleFileLoad(fishCaughtData);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
      console.error("Save Parse Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      parseStardewFish(file);
      setFileName(file.name);
      console.log(file.name);
    }
  };

  const sortedFish = Object.entries(fishCaught).sort(
    (a, b) => b[1].count - a[1].count,
  );
  const totalFish = Object.values(fishCaught).reduce(
    (sum, fish) => sum + fish.count,
    0,
  );

  return (
    <div className="file-input-div">
      {/* <h1>Stardew Valley Fish Parser</h1> */}
      {/* <p>Upload your Stardew Valley save file to see your fishing progress</p> */}
      {/**/}

      {/* <p>Supports both compressed and uncompressed save files</p> */}

      <label htmlFor="file-upload" className="file-input-label">
        Choose File
      </label>
      <input
        id="file-upload"
        type="file"
        className="fileInput"
        onChange={handleFileUpload}
        key="file-input" // Add this
      />
      <span className="file-name-span"> {fileName}</span>
      {/* {loading && ( */}
      {/*   <div> */}
      {/*     <p>Parsing your save file...</p> */}
      {/*   </div> */}
      {/* )} */}
      {/**/}
      {/* {error && ( */}
      {/*   <div> */}
      {/*     <h3>Error parsing save file</h3> */}
      {/*     <p>{error}</p> */}
      {/*   </div> */}
      {/* )} */}
      {/**/}
      {/* {fileName && */}
      {/*   !loading && */}
      {/*   !error && */}
      {/*   Object.keys(fishCaught).length === 0 && ( */}
      {/*     <div> */}
      {/*       <p> */}
      {/*         No fish data found in the save file. Make sure you've uploaded a */}
      {/*         valid Stardew Valley save file. */}
      {/*       </p> */}
      {/*     </div> */}
      {/*   )} */}
      {/**/}
      {/* {Object.keys(fishCaught).length > 0 && ( */}
      {/*   <div> */}
      {/*     <h2>Fish Caught</h2> */}
      {/*     {fileName && <p>File: {fileName}</p>} */}
      {/*     <p> */}
      {/*       {Object.keys(fishCaught).length} species | {totalFish} total fish */}
      {/*     </p> */}
      {/**/}
      {/*     <div> */}
      {/*       {sortedFish.map(([id, fish]) => ( */}
      {/*         <div key={id}> */}
      {/*           <span>{fish.name}</span> */}
      {/*           {fish.name.includes("Unknown") && <span> (ID: {id})</span>} */}
      {/*           <span> - {fish.count} caught</span> */}
      {/*         </div> */}
      {/*       ))} */}
      {/*     </div> */}
      {/*   </div> */}
      {/* )} */}
    </div>
  );
};

export default StardewFishParser;
