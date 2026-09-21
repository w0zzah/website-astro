---
title: "Raycasting in C: first working frame"
date: 2026-09-14
summary: "Got a wall on screen. It took three evenings and one very long argument with a division by zero."
---

Today I finally rendered something that looks like a corridor instead of a
smear of pixels.

## What went wrong first

My DDA loop was stepping in the wrong direction whenever the ray angle crossed
`pi`, because I was deriving the step from the raw delta instead of its sign:

```c
int step_x = (ray_dir_x < 0) ? -1 : 1;
int step_y = (ray_dir_y < 0) ? -1 : 1;
```

Once the sign was explicit, the fisheye distortion I'd been blaming on the
projection turned out to be the actual, expected fisheye — fixed by using the
perpendicular distance rather than the euclidean one.

## What I'd do differently

- Draw the top-down debug view **before** the 3D view next time. Ten minutes of
  work that would have saved two evenings.
- Write the vector maths out on paper first.

Next up: textured walls, and then sprites if I don't get distracted.
