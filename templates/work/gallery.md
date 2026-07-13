<!--
  TEMPLATE — Work image gallery
  Paste the `gallery:` block INTO the frontmatter of a work item (between its
  `---` fences), alongside title/summary/etc. It renders a responsive grid under
  the case study; clicking a thumbnail opens a full-screen lightbox with
  prev/next slideshow navigation (arrow keys, swipe, Esc to close).

  Each item:
    src      — a LOCAL asset (relative ../../assets/work/… path, optimized) OR a
               full https:// URL (hotlinked ArtStation CDN). Mix freely.
               For remote images, paste a `large`/`4k` ArtStation URL so the
               lightbox has a high-res version to enlarge.
    alt      — screen-reader description (recommended)
    caption  — optional caption shown under the image
-->

gallery:
  # Local asset (Astro optimizes it; lightbox uses the full-resolution original):
  - src: ../../assets/work/detail-graph.jpg
    alt: The material's node graph
    caption: Curvature-driven erosion blend in the shader graph

  - src: ../../assets/work/detail-wireframe.jpg
    alt: Wireframe of the reused mesh
    caption: One material, many reused meshes

  # Hotlinked ArtStation CDN image (swap for a real URL):
  - src: https://cdna.artstation.com/p/assets/images/images/012/345/678/large/name.jpg
    alt: Final beauty render
    caption: Final beauty shot
