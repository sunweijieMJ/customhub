import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';

import './vite.init';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin()],
});
