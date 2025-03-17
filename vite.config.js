import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allows access from inside Docker
    port: 5173, // Matches Docker's exposed port
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
});
