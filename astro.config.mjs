import { defineConfig } from 'astro/config';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://porto.christofelkev.site',
  output: 'static',
  adapter: cloudflare()
});