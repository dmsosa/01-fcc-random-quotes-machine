import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: 'fcc-random-quotes-machine',
  plugins: [react()],
})
