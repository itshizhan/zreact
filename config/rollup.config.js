import rollupTypescript from 'rollup-plugin-typescript'
// import uglify from 'rollup-plugin-uglify'
// import { minify } from 'uglify-es'
import pkg from '../package.json'
// import typescript from 'typescript'

const isProduction = process.env.NODE_ENV === 'production'

// set new typescript
const rollupTypescriptPlugin = rollupTypescript()
export default {
    entry: 'src/zreact.ts',
    moduleName: 'Zreact',
    // dest: isProduction ? 'dist/zreact.min.js' : 'dist/zreact.js',
    plugins: [rollupTypescriptPlugin],
    sourceMap: !isProduction,
    targets: [
        {
            format: 'umd',
            dest: pkg.main
        },
        {
            format: 'es',
            dest: pkg.module
        }
	]
}