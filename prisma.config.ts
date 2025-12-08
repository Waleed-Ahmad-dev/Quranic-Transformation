// prisma.config.ts
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "ts-node prisma/seed.ts", // <--- Add this line
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});