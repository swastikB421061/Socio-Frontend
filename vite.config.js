import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			"/api": {
				// target: "http://localhost:5000",
				target: "https://socio-g7bt.onrender.com",
				changeOrigin: true,
			},
		},
	},
});
