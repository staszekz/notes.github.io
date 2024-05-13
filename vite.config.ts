import react from '@vitejs/plugin-react'
// import path from "path";
import { defineConfig } from "vite";
// import { viteStaticCopy } from "vite-plugin-static-copy";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default () => {
  // process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    assetsInclude: ["**/*.pdf"],

    plugins: [
      react(),
      viteTsconfigPaths(),
      svgrPlugin(),
      // viteStaticCopy({
      //   targets: [
      //     {
      //       src: path.resolve(__dirname, "./src/assets") + "/[!.]*", // 1️⃣
      //       dest: "./assets", // 2️⃣
      //     },
      //   ],
      // }),
    ],

    test: {
      globals: true,
      environment: "jsdom",
      //setupFiles: "./tests/setup.js",
    },
  });
};
