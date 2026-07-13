---
title: Notes on triplanar projection
description: A short, practical primer on triplanar mapping — when it's worth the extra samples and how to keep the blend from looking mushy.
date: 2026-07-08
tags: [shaders, technical-art]
---

Triplanar projection samples a texture three times — once per world axis — and
blends by the surface normal. It's the go-to fix for UV stretching on procedural
or heavily deformed geometry.

## The blend is everything

A naive linear blend by normal produces a mushy seam. Sharpen it by raising the
blend weights to a power:

```hlsl
float3 blend = pow(abs(worldNormal), sharpness);
blend /= (blend.x + blend.y + blend.z);
```

Higher `sharpness` narrows the transition band. Too high and you get a hard seam;
around 4–8 is usually a good starting point.

## Cost

Three samples per texture adds up fast with normal + roughness + AO maps. Reserve
triplanar for the surfaces that actually need it (cliffs, terrain, deformed rock),
and fall back to UVs everywhere else.
