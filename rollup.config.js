import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import replace from 'rollup-plugin-replace';
import pkg from './package.json';

export default [
  {
    input: 'packages/index.js',
    plugins: [
      resolve(),
      terser({
        module: true,
        mangle: {
          module: true
        }
      })
    ],
    output: [
      {
        file: pkg.module,
        format: 'es'
      },
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        name: 'dashed',
        file: pkg.umd,
        format: 'umd'
      }
    ]
  }
];
