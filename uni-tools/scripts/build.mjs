import * as esbuild from 'esbuild'
esbuild.build(
  {
    entryPoints: ['index.js'],
    bundle: true,
    platform: 'node',
    outfile: 'out.cjs',
    format: 'cjs'
  }
).then(result => { console.log(result) })