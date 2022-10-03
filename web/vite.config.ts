import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // assetsInclude: ['**/*.vs', '**/*.fs'],
  logLevel: 'info',
  optimizeDeps: {

  },
  server: {
    fs: {
      allow: [
        "/Users/mingsumsze/dev/design-system/",
        "/Users/mingsumsze/dev/workshop-system/web/"
      ]
    }
  },
  plugins: [
    react({
      // Exclude storybook stories
      // exclude: /\.stories\.(t|j)sx?$/,
      // Only .tsx files
      include: '**/*.tsx'
    }),
  ],
  resolve: {
    alias: [
      // "@*": path.resolve(__dirname, './src/*')
      {
        find: /@styleProvider/,
        replacement: path.resolve(__dirname, 'src/styleProvider'),
      },
      {
        find: /@pages/,
        replacement: path.resolve(__dirname, 'src/pages'),
        // customResolver: (source, importer, options) => {
        //   console.debug('Source', source);
        // }
      },
      {
        find: /@layout/,
        replacement: path.resolve(__dirname, 'src/layout'),
      },
      {
        find: /@components/,
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: /@hooks/,
        replacement: path.resolve(__dirname, 'src/hooks'),
      },
      {
        find: /@assets/,
        replacement: path.resolve(__dirname, 'assets'),
      },
      {
        find: /@fonts/,
        replacement: path.resolve(__dirname, 'fonts'),
      },
      {
        find: /@mingsumsze\/common/,
        replacement: path.resolve(__dirname, 'node_modules/@mingsumsze/common/src'),
      },
      {
        find: /^firebase\/firestore/,
        replacement: path.resolve(__dirname, 'node_modules/@firebase/firestore'),
      },
      // {
      //   find: /@artizon\/design-system/,
      //   replacement: path.resolve(__dirname, 'node_modules/@artizon/design-system/src'),
      // },
      // @artizon/design-system
      // {
      //   find: /@fonts/,
      //   replacement: path.resolve(__dirname, 'node_modules/@artizon/design-system/fonts'),
      // },
      // {
      //   find: /@styleProvider/,
      //   replacement: path.resolve(__dirname, 'node_modules/@artizon/design-system/src/styleProvider'),
      // },
      // {
      //   find: /@button/,
      //   replacement: path.resolve(__dirname, 'node_modules/@artizon/design-system/src/button'),
      // },
      // {
      //   find: /@nav/,
      //   replacement: path.resolve(__dirname, 'node_modules/@artizon/design-system/src/nav'),
      // },
      // {
      //   find: /@input/,
      //   replacement: path.resolve(__dirname, 'node_modules/@artizon/design-system/src/input'),
      // },
      // // Such that same instance of React is used
      // {
      //   find: /^react$/,
      //   replacement: path.resolve(__dirname, 'node_modules/react'),
      // },
      // {
      //   find: /^react-dom$/,
      //   replacement: path.resolve(__dirname, 'node_modules/react-dom'),
      // },
    ]
  }
});