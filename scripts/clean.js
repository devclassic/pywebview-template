import fse from 'fs-extra'

await Promise.all([
  fse.remove('.venv'),
  fse.remove('node_modules'),
  fse.remove('dist'),
  fse.remove('build'),
  fse.remove('ui'),
  fse.remove('bun.lock'),
  fse.remove('deno.lock'),
  fse.remove('uv.lock'),
])

console.log('Done')
