
const ground = {
  id: 'box',
  shape: 'box',
  pType: 'static',
  width: 18,
  height: 0.5,
  gType: 'box',
  fill: 0x999999,
  x: 10,
  y: 18,
}

const edge = {
  id: 'edge',
  shape: 'edge',
  pType: 'static',
  startPos: { x: 0, y: 0 },
  endPos: { x: 18, y: 0 },
  gType: 'line',
  x: 1,
  y: 16,
}

const circle = {
  id: 'circle',
  shape: 'circle',
  // pType: 'static',
  radius: 1,
  gType: 'circle',
  fill: 0xff0000,
  x: 0,
  y: 0,
}

const box = {
  id: 'box',
  shape: 'box',
  // pType: 'static',
  width: 1,
  height: 1,
  gType: 'box',
  fill: 0x00ff00,
  x: 2,
  y: 2,
}

const polygon = {
  id : 'polygon',
  shape: 'polygon',
  // pType: 'static',
  gType: 'polygon',
  vertices: [
    [0,0],
    [1,0],
    [1, 2],
    [0, 1],
  ],
  fill: 0x0000ff,
  x: 5,
  y: 2,
}

export {
  edge, ground, circle, box, polygon,
}