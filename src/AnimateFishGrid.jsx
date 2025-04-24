import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedFishGrid = ({ filteredFish, isSelectedMapState }) => {
  // This state will help us track which items are new or changed
  const [prevFishKeys, setPrevFishKeys] = useState([]);

  // Update the previous keys when the filtered fish change
  useEffect(() => {
    const currentKeys = Object.values(filteredFish)
      .filter((fish) => isSelectedMapState.get(fish.Name))
      .map((fish) => fish.Name);

    setPrevFishKeys(currentKeys);
  }, [filteredFish, isSelectedMapState]);

  return (
    <div className="fish-grid">
      <AnimatePresence>
        {Object.values(filteredFish).map((fish, index) =>
          isSelectedMapState.get(fish.Name) ? (
            <motion.div
              key={fish.Name}
              className="fish-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.3,
                delay: index * 0.03, // Staggered delay based on index
                ease: "easeOut",
              }}
              layoutId={fish.Name} // This enables smooth transitions between layouts
            >
              <div className="fish-content">
                <span className="fish-name">{fish.Name}</span>
                {fish.Weather !== "Any" && (
                  <span className="fish-weather">
                    {fish.Weather === "Sun"
                      ? "☀️"
                      : fish.Weather === "Rain"
                        ? "🌧"
                        : ""}
                  </span>
                )}
              </div>
            </motion.div>
          ) : null,
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedFishGrid;
