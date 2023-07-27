import { build } from 'esbuild'
import packageJson from './package.json' assert { type: 'json' }
import { sassPlugin, postcssModules } from 'esbuild-sass-plugin'

await build({
    entryPoints: ['src/index.jsx'],
    outdir: 'dist',
    bundle: true,
    format: 'esm',
    external: Object.keys(packageJson.peerDependencies),
    plugins: [
        sassPlugin({
            type: 'style',
            transform: postcssModules({}),
        }),
    ],
})
