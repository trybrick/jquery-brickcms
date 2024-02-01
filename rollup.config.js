import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: './src/brickcms.ts',
    output: {
      file: './dist/brickcms.js',
      format: 'iife',
      name: "kostegator"
    },
    plugins: [
      typescript(),
      nodeResolve(),
      commonjs(),
    ],
  }
];
