import React, { useState, ChangeEvent, useRef } from "react";
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
  const [fileSeason, setFileSeason] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    const capitalize = (str: string | null | undefined): string => {
      if (!str) return str || "";
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    try {
      // Validate file
      if (!file || file.size === 0) {
        setError("Invalid or empty file");
        return;
      }

      const saveCompressed = file.size < 512000;
      let xmlContent: string;

      if (saveCompressed) {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          xmlContent = inflate(uint8Array, { to: "string" });
        } catch (inflateError) {
          setError("Failed to decompress file - may be corrupted");
          return;
        }
      } else {
        xmlContent = await file.text();
      }

      // Validate content
      if (!xmlContent || xmlContent.trim().length === 0) {
        setError("File appears to be empty");
        return;
      }

      // Check if it looks like XML
      if (!xmlContent.trim().startsWith("<")) {
        setError("File does not appear to be a valid XML save file");
        return;
      }

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, "text/xml");

      const parseError = xmlDoc.querySelector("parsererror");
      if (parseError) {
        setError(`XML parsing failed: ${parseError.textContent}`);
        return;
      }

      const fishCaughtData: FishCaughtData = {};
      const players = xmlDoc.querySelectorAll("farmhand, SaveGame > player");

      if (players.length === 0) {
        setError("No player data found in save file");
        return;
      }

      const currentSeason = capitalize(
        xmlDoc.querySelector("currentSeason")?.textContent,
      );

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

      if (currentSeason) {
        setFileSeason(currentSeason);
        console.log(currentSeason);
      } else {
        console.log("currentSeason element not found");
      }

      setFishCaught(fishCaughtData);
      handleFileLoad(fishCaughtData, currentSeason);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setError(errorMessage);
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
    }
    event.target.value = "";
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
      <div
        className="file-input-button-div"
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            fileInputRef.current?.click();
          }
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className={`file-input-label ${error !== "" ? "error" : ""}`}>
          {loading ? "Loading..." : "Choose File"}
        </div>
      </div>
      <input
        ref={fileInputRef}
        id="file-upload"
        type="file"
        className="fileInput"
        onChange={handleFileUpload}
        key="file-input"
        style={{ display: "none" }}
      />
      <div className="file-name-container">
        {error ? (
          <span className="file-name-span">
            Error parsing save file: {error}
          </span>
        ) : (
          <span className="file-name-span">{fileName}</span>
        )}
      </div>
    </div>
  );
};

export default StardewFishParser;
