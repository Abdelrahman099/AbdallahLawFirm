import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import fs from "node:fs";
import path from "node:path";
const staticPreview = {
  name: "prerendered-preview",
  configurePreviewServer(server) {
    server.middlewares.use((request, response, next) => {
      if (
        request.method !== "GET" ||
        !request.headers.accept?.includes("text/html")
      )
        return next();
      const url = new URL(request.url, "http://localhost");
      const root = path.resolve("dist");
      const route = decodeURIComponent(url.pathname).replace(/^\/+|\/+$/g, "");
      const file = path.resolve(root, route, "index.html");
      if (!file.startsWith(root + path.sep)) return next();
      if (fs.existsSync(file))
        request.url =
          "/" + (route ? route + "/" : "") + "index.html" + url.search;
      else {
        request.url = "/404.html";
        response.statusCode = 404;
      }
      next();
    });
  },
};
export default defineConfig({
  plugins: [react(), tailwindcss(), staticPreview],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  optimizeDeps: { entries: ["index.html"] },
  build: { sourcemap: false },
  server: { port: 5000, strictPort: true },
});
