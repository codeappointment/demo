import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    base: '/build/', // 👈 ADD THIS: Forces all manifest URLs to start cleanly from the web root
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/css/prescription.css',
                'resources/css/popup.css',
                'resources/js/popup.js',
                'resources/js/complaints.js',
                'resources/js/drugDatabase.js',
                'resources/js/investigationDatabase.js',
                'resources/js/dosesDatabase.js',
                'resources/js/adviceDatabase.js'
            ],
            refresh: true,
        }),
    ],
    build: {
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