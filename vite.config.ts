import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@lib': path.resolve(__dirname, './src/lib/'),
            '@types': path.resolve(__dirname, './src/types/'),
            '@api': path.resolve(__dirname, './src/api/'),
            '@config': path.resolve(__dirname, './src/config/'),
            '@styles': path.resolve(__dirname, './src/styles/'),
            '@providers': path.resolve(__dirname, './src/providers/'),
        },
    },
    plugins: [react()],
    base: "./"
})
