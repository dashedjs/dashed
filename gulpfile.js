const gulp = require('gulp');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const terser = require('rollup-plugin-terser');
const replace = require('rollup-plugin-replace');

const packages = [
  'base',
  'button',
  'card',
  'checkbox',
  'fab',
  'header',
  'icon',
  'icons',
  'input',
  'link',
  'notification',
  'radio',
  'select',
  'slider',
  'tag',
  'toggle'
];

gulp.task('build', gulp.parallel(buildSeries, buildBundle));

gulp.task('buildSeries', buildSeries);
gulp.task('buildParallel', buildParallel);
gulp.task('buildBundle', buildBundle);

function buildBundle() {
  return rollup
    .rollup({
      input: 'packages/index.js',
      plugins: [
        resolve(),
        terser.terser({
          module: true,
          mangle: {
            module: true
          }
        })
      ]
    })
    .then(rollupFileBuild =>
      rollupFileBuild.write({
        file: 'dist/index.min.js',
        format: 'es'
      })
    );
}

async function buildSeries() {
  for (let package of packages) {
    const rollupFileBuild = await rollup.rollup({
      input: `packages/${package}/${package}.js`,
      plugins: [
        resolve(),
        replace({ values: { hello: '' } }),
        terser.terser({
          module: true,
          mangle: {
            module: true
          }
        })
      ],
      experimentalCodeSplitting: true
    });
    console.log(`Building package: ${package} ...`);
    rollupFileBuild.write({
      file: `packages/${package}/dist/${package}.min.js`,
      format: 'es'
    });
  }
}

async function buildParallel() {
  await Promise.all(
    packages.map(package =>
      rollup
        .rollup({
          input: `packages/${package}/${package}.js`,
          plugins: [
            resolve(),
            terser.terser({
              module: true,
              mangle: {
                module: true
              }
            })
          ]
        })
        .then(rollupFileBuild =>
          rollupFileBuild.write({
            file: `packages/${package}/dist/${package}.min.js`,
            format: 'es'
          })
        )
    )
  );
}
