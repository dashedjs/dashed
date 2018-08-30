import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
  {
    input: 'packages/dashed.js',
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

  // // browser-friendly UMD build
  // {
  //   input: 'packages/dashed.js',
  //   output: {
  //     name: 'howLongUntilLunch',
  //     file: pkg.browser,
  //     format: 'umd'
  //   },
  //   plugins: [
  //     resolve(), // so Rollup can find `ms`
  //     commonjs() // so Rollup can convert `ms` to an ES module
  //   ]
  // },

  // // CommonJS (for Node) and ES module (for bundlers) build.
  // // (We could have three entries in the configuration array
  // // instead of two, but it's quicker to generate multiple
  // // builds from a single configuration where possible, using
  // // an array for the `output` option, where we can specify
  // // `file` and `format` for each target)
  // {
  //   input: 'packages/dashed.js',
  //   external: ['ms'],
  //   output: [{ file: pkg.main, format: 'cjs' }, { file: pkg.module, format: 'es' }]
  // }
];
