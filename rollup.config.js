import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

export default [
  {
    input: 'packages/index.ts',
    plugins: [
      resolve(),
      typescript({
        typescript: require('typescript')
      }),
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
