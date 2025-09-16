import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],

	// Path resolution
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},

	// Development server configuration
	server: {
		port: 3001,
		host: true, // Allow external connections
		open: true, // Open browser automatically

		// Proxy API requests to backend
		proxy: {
			"/api": {
				target: process.env.VITE_API_BASE_URL || "http://localhost:3000",
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api/, "/api"),
			},
		},
	},

	// Build configuration
	build: {
		outDir: "dist",
		sourcemap: true,

		// Optimize chunks
		rollupOptions: {
			output: {
				manualChunks: {
					// Vendor chunk for React and related libraries
					vendor: ["react", "react-dom", "react-router-dom"],
					// UI chunk for UI libraries
					ui: ["lucide-react"],
				},
			},
		},

		// Build optimizations
		minify: "esbuild", // Use faster esbuild instead of terser
	},

	// Preview server (for production build)
	preview: {
		port: 3000,
		host: true,
		// Handle client-side routing in preview mode
		historyApiFallback: true,
	},

	// Environment variables prefix
	envPrefix: "VITE_",

	// CSS configuration
	css: {
		postcss: "./postcss.config.js",
	},

	// Testing configuration
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/test/setup.js"],
		css: true,
	},

	// Optimization
	optimizeDeps: {
		include: ["react", "react-dom", "react-router-dom", "lucide-react"],
	},

	// Define global constants
	define: {
		__APP_VERSION__: JSON.stringify(process.env.npm_package_version),
	},
});
