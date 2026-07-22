import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const input = resolve(
  process.argv[2] ?? "public/omnivideos/Hero_sequence_production_guide_202607131630.mp4",
);

if (!existsSync(input)) {
  console.error(`Video not found: ${input}`);
  process.exit(1);
}

const outputDirectory = resolve("public/omnivideos");
mkdirSync(outputDirectory, { recursive: true });

const variants = [
  { name: "hero-scroll-master.mp4", width: 1280, crf: 20 },
  { name: "hero-scroll-master-mobile.mp4", width: 960, crf: 23 },
];

for (const variant of variants) {
  const output = resolve(outputDirectory, variant.name);
  const ffmpeg = spawnSync("ffmpeg", [
    "-hide_banner",
    "-loglevel", "error",
    "-y",
    "-i", input,
    "-an",
    "-vf", `fps=24,scale=${variant.width}:-2:flags=lanczos`,
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", String(variant.crf),
    "-profile:v", "high",
    "-pix_fmt", "yuv420p",
    "-g", "6",
    "-keyint_min", "6",
    "-sc_threshold", "0",
    "-refs", "1",
    "-movflags", "+faststart",
    output,
  ], { stdio: "inherit" });

  if (ffmpeg.error?.code === "ENOENT") {
    console.error("ffmpeg is not installed or is not available on PATH.");
    process.exit(1);
  }
  if (ffmpeg.status !== 0) process.exit(ffmpeg.status ?? 1);
  console.log(`Created ${output}`);
}
