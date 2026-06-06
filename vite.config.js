import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    base: '/build/', // 👈 ADD THIS: Forces all manifest URLs to start cleanly from the web root
    plugins: [
        laravel({
            input: [
                'resources/css/prescription.css',
                'resources/css/popup.css',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
    ],
    build: {
        sourcemap: true,
        outDir: 'public/build', // Compiles locally to public/build
        rollupOptions: {
            output: {
                assetFileNames: 'assets/[name].[ext]',
                chunkFileNames: 'assets/[name].js',
                entryFileNames: 'assets/[name].js',
            },
        },
    },
});