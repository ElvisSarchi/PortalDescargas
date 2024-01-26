import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import node from "@astrojs/node";

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), compress()],
  output: 'server',
  adapter: node({
    mode: "standalone"
  })
});