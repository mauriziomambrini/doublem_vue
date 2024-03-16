import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import rawPlugin from 'vite-raw-plugin';
import Sitemap from 'vite-plugin-sitemap';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Sitemap({
      hostname: 'https://www.doublem.dev',
    }),
    VueI18nPlugin({
      runtimeOnly: false,
      include: './src/i18n/langs/*',
    }),
    rawPlugin({ fileRegex: /\.gql$/ }),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@composable': path.resolve(__dirname, './src/composable'),
      '@gql': path.resolve(__dirname, './src/graphql'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@icons': path.resolve(__dirname, './src/assets/icons'),
      '@images': path.resolve(__dirname, './src/assets/images'),
      '@views': path.resolve(__dirname, './src/views'),
    },
  },
});
