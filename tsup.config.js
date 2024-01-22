import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  format: ["esm"],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: ["src/**/*.ts"],
});
