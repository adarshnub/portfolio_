# System Sequence Production Guide

This sequence is for the "One connected system" section. The motion should feel like an engineered exploded view: the connected pipeline opens up, reveals its internal parts, then holds as a clean visual system.

## Deliverables

- Resolution: 1920 x 1080 minimum, 3840 x 2160 preferred
- Duration: 5 seconds
- Frame rate: 30 fps
- Camera: one continuous controlled move, no cuts
- Export: H.264 MP4, high bitrate, no audio
- Continuity: preserve the five rounded blocks, materials, palette, lighting, and charcoal studio background

## Reference Images

- Start frame: `public/storyboards/system-start.png`
- End frame: `public/storyboards/system-end.png`

Use `system-start.png` as the starting frame and `system-end.png` as the ending frame in Omni.

## Google Flow / Omni Prompt

```text
A single continuous cinematic 3D product-film shot for an interactive portfolio section. Begin on the supplied start frame: five tactile rounded-square system blocks arranged as one connected AI pipeline on a deep charcoal studio background. The blocks are connected by graphite rods and ports: pale pink-lavender input, electric-lime transparent agent block, saturated cobalt-blue queue block, safety-orange transparent render block, and soft white ceramic output block.

Over 5 seconds, the connected pipeline performs a precise engineered exploded-view transformation. The camera slowly pushes forward and arcs clockwise by roughly 20 degrees while the blocks separate smoothly along the horizontal axis and slightly into depth. Face plates, connector pins, internal circuit layers, black chrome rods, translucent shells, screws, ports, and small mechanical spacers slide outward from each block in clean parallel motion. Nothing breaks and nothing flies chaotically; every piece moves like a controlled CAD assembly animation. Thin graphite rods and subtle luminous traces remain aligned so the viewer still understands one continuous system from input to output.

End on the supplied end frame: the same five blocks fully opened into a clean exploded view, with readable silhouettes, crisp shadows, and generous negative space on the left for website typography. Preserve the exact object identity, colors, proportions, materials, lighting direction, and charcoal background from the reference images. Bright hard studio lighting, tactile material texture, dust and fine surface imperfections, playful industrial Suburbia-inspired palette, physically plausible motion, sharp focus, no camera shake.

One shot only. No cuts, no morphing, no melting, no debris, no smoke, no fire, no people, no hands, no logos, no readable text, no random floating objects, no duplicated blocks, no palette drift, no exposure flicker, no sudden speed changes, and no depth-of-field pulsing.
```

## Negative Prompt

```text
No people, hands, faces, typography, labels, logos, watermarks, scene cuts, camera shake, broken pieces, debris, fire, smoke, liquid motion, object morphing, melted geometry, duplicated blocks, extra machinery, random floating spheres, inconsistent shadows, palette drift, exposure flicker, soft focus, heavy motion blur, or abrupt acceleration.
```

## Duration

Use 5 seconds at 30 fps. That gives 150 frames, which is enough for a smooth scroll interaction without making the section too heavy.

If Omni produces motion that feels too fast, regenerate at 6 seconds. Do not go over 6 seconds unless we intentionally want a long pinned scroll section.

## Install The Result

Place the returned MP4 anywhere in the repo, for example:

```powershell
public\omnivideos\system-exploded-view.mp4
```

Then run:

```powershell
npm run frames:system -- .\public\omnivideos\system-exploded-view.mp4
```

The command creates optimized WebP frames under `public/sequences/system/` and updates `public/sequences/system/manifest.json`. The raw MP4 does not need to ship with the production site.
