import spawn from 'cross-spawn'
import fse from 'fs-extra'

process.env.NODE_ENV = 'production'

spawn.sync('vite', ['build'], { stdio: 'inherit' })

fse.removeSync('dist')

const build = 'pyinstaller -D -w -n=hello --add-data=ui:ui -i=icons/icon.ico src-main/main.py'

spawn.sync('uv', ['run', ...build.split(' ')], {
  stdio: 'inherit',
})

console.log('Done')
