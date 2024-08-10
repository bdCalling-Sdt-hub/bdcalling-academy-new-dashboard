import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
<<<<<<< HEAD
    host: "192.168.10.6",
=======
    host: "192.168.10.205",
>>>>>>> 0cc01485818442fc0fbae703da8384c9ccb6c37e
    port: "3001",
  },
})
