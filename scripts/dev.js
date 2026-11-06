import spawn from 'cross-spawn'

process.env.NODE_ENV = 'development'

spawn('vite', { stdio: 'inherit' })

spawn('uv', ['run', 'src-main/main.py'], { stdio: 'inherit' })
