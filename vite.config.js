import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.POSE_BASE || '/pose/',
  plugins: [react()],
});
