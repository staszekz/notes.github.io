import react from '@vitejs/plugin-react'
// import path from "path";
import { defineConfig } from "vite";
// import { viteStaticCopy } from "vite-plugin-static-copy";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import viteReact from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default () => {
  // process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    assetsInclude: ["**/*.pdf"],

    plugins: [
      viteTsconfigPaths(),
      svgrPlugin(),
      TanStackRouterVite(),
      viteReact()
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
