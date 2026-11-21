import { rimraf } from 'rimraf'

await Promise.all([
  rimraf(['.venv', 'node_modules', 'dist', 'build', 'ui']),
  rimraf(['*.lock', '*.spec'], { glob: true }),
])

console.log('Done')
