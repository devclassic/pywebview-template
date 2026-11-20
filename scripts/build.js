import spawn from 'cross-spawn'
import fse from 'fs-extra'
import { program } from 'commander'
import os from 'os'
import * as toml from 'smol-toml'

const name = 'hello'

process.env.NODE_ENV = 'production'

const platform = os.platform()

function run(command, args) {
  const result = spawn.sync(command, args, {
    stdio: 'inherit',
  })

  if (result.error) throw result.error

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

// 构建前端
run('vite', ['build'])

// 清空原有 Python 依赖
const pyproject = toml.parse(fse.readFileSync('pyproject.toml', 'utf8'))
pyproject.project.dependencies = []
fse.writeFileSync('pyproject.toml', toml.stringify(pyproject))

// 根据系统安装依赖
let dependencies = []

switch (platform) {
  case 'win32':
    dependencies = ['pywebview', 'nuitka', 'pyinstaller']
    break
  case 'darwin':
    dependencies = [
      'pywebview',
      'nuitka',
      'pyinstaller',
      'pyobjc-core',
      'pyobjc-framework-cocoa',
      'pyobjc-framework-quartz',
      'pyobjc-framework-webkit',
      'pyobjc-framework-security',
    ]
    break

  case 'linux':
    dependencies = ['pywebview[gtk]', 'nuitka', 'pyinstaller', 'pygobject', 'pycairo']
    break

  default:
    throw new Error(`Unsupported platform: ${platform}`)
}

run('uv', ['add', '--upgrade', ...dependencies])

let buildArgs = []

program.option('--builder <str>').parse(process.argv)

const opts = program.opts()

switch (opts.builder) {
  case 'pyinstaller':
    buildArgs = [
      '--noupx',
      '--onedir',
      '--optimize=2',
      `--name=${name}`,
      '--add-data=ui:ui',
      'src-main/main.py',
    ]

    if (platform === 'win32') {
      buildArgs.push('--noconsole', '--icon=icons/icon.ico')
    }

    break

  case 'nuitka':
    buildArgs = [
      '--mode=standalone',
      '--include-data-dir=ui=ui',
      `--output-filename=${name}`,
      '--output-dir=dist',
      '--jobs=8',
      '--lto=yes',
      'src-main/main.py',
    ]

    if (platform === 'win32') {
      buildArgs.push('--windows-console-mode=disable', '--windows-icon-from-ico=icons/icon.ico')
    }

    break

  default:
    throw new Error('Unknown builder')
}

run('uv', ['run', opts.builder, ...buildArgs])

if (platform === 'linux') {
  for (const lib of [
    'libglib-2.0.so.0',
    'libgio-2.0.so.0',
    'libgobject-2.0.so.0',
    'libgmodule-2.0.so.0',
    'libmount.so.1',
  ]) {
    fse.removeSync(`dist/${name}/_internal/${lib}`)
  }
  fse.removeSync(`dist/${name}/_internal/share/icons`)
}

console.log('Done')
