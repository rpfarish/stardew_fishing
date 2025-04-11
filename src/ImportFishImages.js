const fishImageModules = import.meta.glob("./assets/all_fish/*.jpg", {
  eager: true,
});

// Create a mapping object from fish name to image URL
const fishImages = {};
Object.entries(fishImageModules).forEach(([path, module]) => {
  // Extract fish name from path (e.g., "./assets/all_fish/Albacore.jpg" -> "Albacore")
  const fishName = path.match(/\/([^/]+)\.jpg$/)[1];
  fishImages[fishName] = module.default; // In Vite, the actual image URL is in module.default
});
export default fishImages;
