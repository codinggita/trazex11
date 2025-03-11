import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: 
  {
    allowedHosts:[
      "723c-2409-40c1-5004-8229-59a6-26ef-76cd-c36b.ngrok-free.app"
    ]
  }
})
