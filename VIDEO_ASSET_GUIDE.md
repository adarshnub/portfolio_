# Hero Scroll Film Production Guide

The homepage uses a 6-second, 16:9 MP4 whose playback time is mapped directly to scroll position. The delivery masters use the same fast-seek profile as the Datacom scroll film: 24 fps with a keyframe every six frames (0.25 seconds), one reference frame, and no scene-cut keyframes.

## Deliverables

- Resolution: 1920 x 1080 minimum, 3840 x 2160 preferred
- Duration: 6 seconds
- Frame rate: 24 fps
- Camera: one continuous slow push-through, no cuts or handheld shake
- Export: H.264 MP4, high bitrate, no audio
- Continuity: preserve the central frame-engine object, materials, and palette from the supplied first and last images

## Google Flow Prompt

Use the generated `hero-start.png` as the starting frame and `hero-end.png` as the ending frame.

```text
A single continuous cinematic macro camera move through a playful industrial AI film-frame engine. Begin very close to the hero object on a dusty pink concrete studio floor: a chunky transparent electric-lime glass frame cartridge held by a black chrome mechanical rig, with saturated cobalt-blue braces and small safety-orange controls. Slowly dolly forward and arc clockwise by roughly 35 degrees as the machine activates. Individual translucent film frames separate cleanly from the cartridge, travel through precise mechanical guides, and expand into an organized orbit around the same central object. Fine dust, fingerprints, molded seams, paper stickers without readable text, and tactile imperfections remain visible. End on a wider composed view matching the supplied ending frame, with the frame orbit forming a clear portal and open visual space in the lower left for website typography. Bright hard studio lighting, crisp shadows, graphic editorial 3D product-film aesthetic, playful but engineered, physically plausible motion, stable geometry, sharp focus, no camera shake.

Preserve exact object identity, palette, materials, proportions, and lighting direction between the supplied start and end frames. One shot only. No cuts, morphing, melting, duplicate machinery, new objects, people, logos, readable text, flicker, sudden speed changes, depth-of-field pulsing, or changes to the background color.
```

## Negative Prompt

```text
No people, hands, faces, typography, logos, watermarks, scene cuts, camera shake, object morphing, liquid motion, extra limbs or machinery, duplicated frames, inconsistent shadows, palette drift, exposure flicker, soft focus, motion blur covering the hero object, or abrupt acceleration.
```

## Install The Result

Place the returned MP4 anywhere in the repo, then run:

```powershell
npm run video:hero -- .\assets\hero-flow.mp4
```

The command creates two H.264 masters under `public/omnivideos/`: a 1280px desktop version at CRF 20 and a 960px mobile version at CRF 23. Both use H.264 High profile, 24 fps, a six-frame GOP, one reference frame, `yuv420p`, and fast-start metadata.

Commit both generated masters before deploying. The original source remains useful for future re-encodes but is not loaded by the hero.
