import { defineConfig, envField } from 'astro/config'
import icon from 'astro-icon';
import relativeLinks from 'astro-relative-links'
import purgecss from 'astro-purgecss'
import purgeOpts from './purgecss.config.mjs'
// import compress from '@playform/compress'
import compressor from 'astro-compressor'
import min from 'astro-min';
import { getCurrentNonce } from './src/js/getCurrentNonce'
// import prebuild from "./src/intergrations/prebuild"; //prebuild()

export default defineConfig({
  build: {
    inlineStylesheets: 'auto'
  },
  output: 'static',
  // site: 'https://example.com', // We are not setting this as we want to deploy to domain mirrors, e.g. yourname.github.io and yourname.com.
  // Using @playform/compress for general compression (images html etc.), but useing prugecss first for CSS purge & minification.
  integrations: [icon(), relativeLinks(), purgecss(purgeOpts),
    min(), // html, css, js, svg minification
    // compress({
    //   CSS: false,
    //   HTML: false,
    //   Image: true, // '@playform/compress' breaks our css vars, but is excelent at compressing images
    //   JavaScript: false,
    //   SVG: false}),
    compressor() // gzip & brotli compression
  ],

  experimental: {
    env: {
      // Env to identify server build for GH actions - eg 'public canonical' (https://memorialforestdg.github.io) and 'mirror' (https://memorialforestdg.co.uk)
      schema: {
        PUBLIC_CANONICAL: envField.string({
          context: "server",
          access: "public",
          optional: true
        }),
        PUBLIC_MIRROR: envField.string({
          context: "server",
          access: "public",
          optional: true
        })
      }
    }
  }
});
