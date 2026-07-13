import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const firstArg = process.argv[2];
const secondArg = process.argv[3];
const sequence = secondArg ? firstArg : "hero";
const input = secondArg ?? firstArg;

if (!input) {
  console.error("Usage: node scripts/extract-frames.mjs [sequence-name] path/to/video.mp4");
  process.exit(1);
}

if (!/^[a-z0-9-]+$/.test(sequence)) {
  console.error("Sequence name must use lowercase letters, numbers, and hyphens only.");
  process.exit(1);
}

const source = resolve(input);
if (!existsSync(source)) {
  console.error(`Video not found: ${source}`);
  process.exit(1);
}

const output = resolve("public/sequences", sequence);
mkdirSync(output, { recursive: true });
for (const file of readdirSync(output)) {
  if (/^frame-\d{4}\.webp$/.test(file)) rmSync(resolve(output, file));
}

const ffmpeg = spawnSync("ffmpeg", [
  "-hide_banner", "-loglevel", "error", "-i", source,
  "-vf", "fps=30,scale=1920:-2:flags=lanczos",
  "-c:v", "libwebp", "-quality", "82", "-compression_level", "5",
  resolve(output, "frame-%04d.webp"),
], { stdio: "inherit" });

if (ffmpeg.error?.code === "ENOENT") {
  console.error("ffmpeg is not installed or is not available on PATH.");
  process.exit(1);
}
if (ffmpeg.status !== 0) process.exit(ffmpeg.status ?? 1);

const frameCount = readdirSync(output).filter((file) => /^frame-\d{4}\.webp$/.test(file)).length;
writeFileSync(resolve(output, "manifest.json"), `${JSON.stringify({
  frameCount,
  pattern: `/sequences/${sequence}/frame-{frame}.webp`,
  fallback: `/storyboards/${sequence}-start.png`,
}, null, 2)}\n`);

console.log(`Created ${frameCount} scroll frames in ${output}`);
