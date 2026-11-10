import spawn from 'cross-spawn'
import fse from 'fs-extra'
import { program } from 'commander'

process.env.NODE_ENV = 'production'

spawn.sync('vite', ['build'], { stdio: 'inherit' })

fse.removeSync('dist')

program.option('--builder <str>').action(opts => {
  console.log(opts)
  let build = ''
  switch (opts.builder) {
    case 'pyinstaller':
      build = 'pyinstaller'
      build += ' --clean'
      build += ' --onedir'
      build += ' --noconsole'
      build += ' --name=hello'
      build += ' --add-data=ui:ui'
      build += ' --icon=icons/icon.ico'
      build += ' src-main/main.py'
      break
    case 'nuitka':
      build = 'nuitka'
      build += ' --remove-output'
      build += ' --mode=standalone'
      build += ' --windows-console-mode=disable'
      build += ' --include-data-dir=ui=ui'
      build += ' --windows-icon-from-ico=icons/icon.ico'
      build += ' --output-filename=hello'
      build += ' --output-dir=dist'
      build += ' src-main/main.py'
      break
    default:
      console.log('unknow builder')
      return
  }
  spawn.sync('uv', ['run', ...build.split(' ')], {
    stdio: 'inherit',
  })
})

program.parse()

console.log('Done')
