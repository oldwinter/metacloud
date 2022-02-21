
import * as esbuild from 'esbuild'
// import 'chalk'
// import 'ora';
// console.log(chalk.cyan('testst'))

// await esbuild.build({
//     entryPoints: ['index.js'],
//     bundle: true,
//     platform: 'node',
//     // target: 'node14',
//     // external: ['', ''],
//     outfile: 'out.js',
//   }).catch(()=>{process.exit(1)})
await esbuild.build(
    {
        entryPoints: ['index.js'],
        bundle: true,
        platform: 'node',
        // target: 'node14',
        // external: ['', ''],
        sourcemap: true,
        watch: true,
        outfile: 'out.js',
    }
).then(result => {
    console.log('watching...')
})