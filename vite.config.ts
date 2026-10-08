import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "local-api",
      apply: "serve",
      configureServer(server) {
        const env = loadEnv(server.config.mode, server.config.envDir, "");
        for (const name of [
          "GOOGLE_SERVICE_ACCOUNT_EMAIL",
          "GOOGLE_PRIVATE_KEY",
          "BOOKING_SHEET_ID",
          "SCREENING_SHEET_ID",
        ]) {
          if (!process.env[name] && env[name]) process.env[name] = env[name];
        }

        // Chạy lại handler production khi thử biểu mẫu bằng Vite trên máy.
        server.middlewares.use(async (req, res, next) => {
          const route = new URL(req.url ?? "/", "http://localhost").pathname;
          if (route !== "/api/booking" && route !== "/api/screening") return next();

          type JsonResponse = typeof res & {
            status: (code: number) => JsonResponse;
            json: (payload: unknown) => JsonResponse;
          };
          const response = res as JsonResponse;
          response.status = (code) => {
            response.statusCode = code;
            return response;
          };
          response.json = (payload) => {
            response.setHeader("Content-Type", "application/json; charset=utf-8");
            response.end(JSON.stringify(payload));
            return response;
          };

          try {
            const chunks: Buffer[] = [];
            let size = 0;
            for await (const chunk of req) {
              const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
              size += buffer.length;
              if (size > 16_384) {
                response.status(413).json({ error: "BODY_TOO_LARGE" });
                return;
              }
              chunks.push(buffer);
            }
            Object.assign(req, { body: Buffer.concat(chunks).toString("utf8") });
            const { default: handler } = await server.ssrLoadModule(`.${route}.js`);
            await handler(req, response);
          } catch (error) {
            server.config.logger.error(`Không thể chạy API local: ${String(error)}`);
            if (!response.headersSent) response.status(500).json({ error: "LOCAL_API_ERROR" });
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
