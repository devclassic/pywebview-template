import spawn from 'cross-spawn'
import os from 'os'
import fse from 'fs-extra'
import * as toml from 'smol-toml'

process.env.NODE_ENV = 'development'

function run(state, command, args) {
  switch (state) {
    case 'sync':
      spawn.sync(command, args, { stdio: 'inherit' })
      break
    case 'async':
      spawn(command, args, { stdio: 'inherit' })
      break
  }
}

run('async', 'vite')

await new Promise(resolve => setTimeout(resolve, 1000))

const platform = os.platform()

let dependencies = []

switch (platform) {
  case 'win32':
    dependencies = ['pywebview', 'nuitka', 'pyinstaller']
    break

  case 'linux':
    dependencies = ['pywebview[gtk]', 'nuitka', 'pyinstaller', 'pygobject', 'pycairo']
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
run('sync', 'uv', ['add', '--upgrade', ...dependencies])

run('async', 'uv', ['run', 'src-main/main.py'])
