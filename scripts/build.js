import spawn from 'cross-spawn'
import fse from 'fs-extra'
import { program } from 'commander'
import os from 'os'
import path from 'path'
import * as toml from 'smol-toml'

const name = 'test'

process.env.NODE_ENV = 'production'

function run(command, args) {
  const result = spawn.sync(command, args, {
    stdio: 'inherit',
  })

  if (result.error) throw result.error

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

fse.removeSync('dist')
fse.removeSync('ui')

run('vite', ['build'])

const platform = os.platform()

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

const removes = [
  'pywebview',
  'pywebview[gtk]',
  'nuitka',
  'pyinstaller',
  'pygobject',
  'pycairo',
  'pyobjc-core',
  'pyobjc-framework-cocoa',
  'pyobjc-framework-quartz',
  'pyobjc-framework-webkit',
  'pyobjc-framework-security',
]
const pyproject = toml.parse(fse.readFileSync('pyproject.toml').toString())
for (const item of pyproject.project.dependencies) {
  if (!removes.includes(item.split('>')[0])) {
    dependencies.push(item)
  }
}
pyproject.project.dependencies = []
fse.writeFileSync('pyproject.toml', toml.stringify(pyproject))
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

if (platform === 'linux' && opts.builder === 'pyinstaller') {
  const typelibDest = path.join('dist', name, '_internal', 'gi_typelibs')

  if (fse.existsSync(typelibDest)) {
    const searchPaths = [
      '/usr/lib/girepository-1.0',
      '/usr/lib64/girepository-1.0',
      '/usr/lib/x86_64-linux-gnu/girepository-1.0',
      '/usr/lib/aarch64-linux-gnu/girepository-1.0',
    ]

    const needed = [
      'WebKit2-4.1.typelib',
      'JavaScriptCore-4.1.typelib',
      'GdkX11-3.0.typelib',
      'Soup-3.0.typelib',
    ]

    for (const file of needed) {
      let found = false
      for (const dir of searchPaths) {
        const src = path.join(dir, file)
        if (fse.existsSync(src)) {
          fse.copySync(src, path.join(typelibDest, file))
          console.log(`Copied ${file}`)
          found = true
          break
        }
      }
      if (!found) {
        console.warn(`Warning: ${file} not found in system paths`)
      }
    }
  }

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
