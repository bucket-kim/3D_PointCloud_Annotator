# 3D Point Cloud Annotation Tool

A browser-based annotation tool for 3D LiDAR point clouds — load a real sensor scan, select and label objects (vehicles, pedestrians, cyclists), and export the annotations as structured training data. Built with React Three Fiber, TypeScript, and custom GLSL shaders.

<!-- TODO: add a screenshot or GIF of the tool in action here -->
<!-- ![demo](./docs/demo.gif) -->

<!-- TODO: add live demo link if deployed -->
<!-- **[Live Demo](https://your-demo-url)** -->

---

## Data Attribution

The sample point cloud included in this demo is from the **KITTI Vision Benchmark Suite**
(object detection dataset), copyright Andreas Geiger, Philip Lenz, Christoph Stiller, and
Raquel Urtasun.

The KITTI dataset is published under the **Creative Commons Attribution-NonCommercial-ShareAlike
3.0 License** (CC BY-NC-SA 3.0). This demo is a non-commercial portfolio project, used with
attribution under those terms.

Citation:

> A. Geiger, P. Lenz, and R. Urtasun.
> "Are we ready for Autonomous Driving? The KITTI Vision Benchmark Suite."
> Conference on Computer Vision and Pattern Recognition (CVPR), 2012.

Dataset: https://www.cvlibs.net/datasets/kitti/
License: https://creativecommons.org/licenses/by-nc-sa/3.0/

## What it does

This tool replicates the human-annotation step of an autonomous-vehicle perception pipeline: raw LiDAR scans go in, human-labeled bounding boxes come out, ready to feed a training pipeline.

- **Load real LiDAR data** — parses raw KITTI Velodyne `.bin` scans (~100,000+ points) directly in the browser
- **Automatic ground detection** — uses a height-histogram to find and de-emphasize the ground plane, so objects stand out
- **Paint-style selection** — hover to select the points belonging to an object; hold `Alt` to scrub off accidental selections
- **Bounding boxes** — automatically fits an axis-aligned bounding box (AABB) around the selected points
- **Labeling** — assign a class label to each object and save it
- **Export** — download all annotations as structured JSON
- **Undo / redo** — full history of annotation actions

---

## Tech stack

| Area            | Choice                                     |
| --------------- | ------------------------------------------ |
| Framework       | React + TypeScript                         |
| 3D rendering    | React Three Fiber (Three.js)               |
| Point rendering | Custom GLSL vertex + fragment shaders      |
| State           | Zustand                                    |
| Performance     | Custom spatial grid + throttled raycasting |

---

## Key technical highlights

A few of the more interesting engineering problems solved in this project:

### Hand-written binary parser

KITTI `.bin` scans are raw little-endian `float32` data with no header — 4 values per point (`x, y, z, intensity`), 16 bytes per point. The loader reads the `ArrayBuffer` directly and derives the point count from the file size, with no parsing library.

### Coordinate-system conversion

LiDAR/automotive data is **z-up**; Three.js is **y-up**. The conversion (a -90° rotation about the X axis) is baked directly into the parse by remapping which raw value feeds each stored field — so there's zero per-frame transform cost and no mismatch between the rendered scene and the raycasting space.

### Spatial-grid raycasting for selection performance

Naive raycasting checks every point on every cursor move — O(n), which doesn't scale to 100k+ points. The tool buckets points into a uniform spatial grid (a voxel grid) so each cursor query only checks points in the cells the ray passes through, plus a throttle to cap query frequency.

### Histogram-based ground detection

Rather than assuming the ground is at a fixed height (or the lowest point — which is just noise), the tool builds a histogram of point heights and finds the **densest** band. The ground is the one surface the sensor sweeps constantly, so it forms a clear spike in the height distribution. (Works for flat scenes; sloped terrain would require plane-fitting such as RANSAC — see notes.)

### Custom shaders for per-point state

Selection highlighting and ground de-emphasis are handled GPU-side: per-point attributes and uniforms flow through the vertex shader to the fragment shader, so visual state updates without rebuilding geometry.

---

## How to use

1. Click **Load** and select a KITTI `.bin` point cloud file
2. Orbit / zoom to inspect the scene (the ground is automatically dimmed)
3. Hover over an object to paint-select its points
4. Hold **Alt** and hover to remove accidentally selected points
5. Type a label (e.g. `car`, `pedestrian`, `cyclist`) and **Save**
6. Repeat for each object
7. Click **Export** to download the annotations as JSON

---

## Running locally

<!-- TODO: confirm these match your actual setup (package manager, scripts) -->

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Then open the local URL shown in the terminal.

### Getting a sample scan

This tool reads KITTI Velodyne `.bin` files. A single sample frame is enough to try it out — these can be found in various KITTI viewer repositories on GitHub (look for a file like `000000.bin`).

---

## Export format

Annotations export as a JSON array, one object per annotation:

```json
[
  {
    "id": 0,
    "label": "pedestrian",
    "center": { "x": 0.0, "y": -0.1, "z": 12.4 },
    "size":   { "x": 0.8, "y": 1.8, "z": 0.6 },
    "pointIndices": [127, 346, 350, ...]
  }
]
```

<!-- TODO: a future version targets the box-based KITTI/nuScenes label format
     (center, dimensions, orientation/yaw, class) without per-point indices -->

---

## Roadmap

- [ ] Box-based export matching KITTI/nuScenes label conventions (orientation/yaw, no per-point indices)
- [ ] Cluster-aware selection (select a whole object from a single point)
- [ ] Oriented bounding boxes (OBB) for tightly-fitted, rotated objects
- [ ] UI/theme polish

---

## Notes & limitations

- Ground detection assumes roughly flat terrain. On slopes, the sensor pitches with the vehicle and the ground appears tilted in the raw sensor frame — robust handling would use plane-fitting (e.g. RANSAC).
- The coordinate conversion assumes KITTI's z-up convention; a different data source would need its conversion adjusted (isolated in one place for that reason).
- Performance is tuned for ~100k-point single frames; larger clouds would benefit from additional techniques (octree, downsampling, or moving work off the main thread).

<!-- TODO: add author / contact / license as desired -->
