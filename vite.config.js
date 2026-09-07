import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createContactHandler } from './api/contact.js'

// Run the same enquiry handler locally and in Vercel's api/contact function.
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env }
  const middleware = (server) => {
    const handler = createContactHandler({ env })
    server.middlewares.use((req, res, next) => {
      if (req.url?.split('?')[0] !== '/api/contact') return next()
      handler(req, res).catch(() => {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Messaging is temporarily unavailable.' }))
      })
    })
  }
  return {
    plugins: [react(), { name: 'local-enquiry-api', configureServer: middleware, configurePreviewServer: middleware }],
    server: { host: '127.0.0.1' },
    preview: { host: '127.0.0.1' },
  }
})
