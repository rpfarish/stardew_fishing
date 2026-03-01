const fishImageModules = import.meta.glob("./assets/all_fish/*.jpg", {
  eager: true,
});
const fishImages = {};
Object.entries(fishImageModules).forEach(([path, module]) => {
  const fishName = path.match(/\/([^/]+)\.jpg$/)[1];
  fishImages[fishName] = module.default;
});
export default fishImages;

// ─── Totem images ─────────────────────────────────────────────────────────────
const totemImageModules = import.meta.glob("./assets/Rain_Totem.jpg", {
  eager: true,
});
export const rainTotemImage = Object.values(totemImageModules)[0]?.default;
