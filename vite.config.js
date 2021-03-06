import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {};
  } else {
    // command === 'build'
    return {
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/main.ts'),
          name: 'JustValidatePluginDate',
          fileName: (format) =>
            `just-validate-plugin-date.${format === 'umd' ? 'production.min' : format}.js`,
        },
        rollupOptions: {},
      },
    };
  }
});
