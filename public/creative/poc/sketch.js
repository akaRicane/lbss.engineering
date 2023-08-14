const dead = new Uint8Array([255, 255, 255, 255]);
const alive = new Uint8Array([255, 64, 0, 255]);
const w = 400;

let cells = new Uint8Array(w * w);
let g;

function setup() {
    const m = min(windowWidth, windowHeight);
    createCanvas(window.innerWidth, window.innerHeight);
    pixelDensity(1);
    background(Array.from(dead));
    g = createGraphics(w, w);
    g.background(Array.from(dead)).loadPixels();
}

function mouseDragged() {
    const zoom = w / width;
    const mx = floor(constrain(mouseX * zoom, 0, w));
    const my = floor(constrain(mouseY * zoom, 0, w));
    cells[mx + my * w] = 1;
}

function draw() {
    let nextCells = new Uint8Array(cells);

    for (let y = 3; y < w - 3; y++) {
        for (let x = 3; x < w - 3; x++) {
            const i = x + y * w;
            const oldState = cells[i];
            const sum0 =
                + cells[i - w] // north
                + cells[i + w] // south
                + cells[i + 1] // east
                + cells[i - 1] // west
                + cells[i + 1 - w] // ne
                + cells[i - 1 - w] // nw
                + cells[i + 1 + w] // se
                + cells[i - 1 + w] // sw
                + cells[i - w * 2] // nn
                + cells[i + w * 2] // ss
                + cells[i + 2] // ee
                + cells[i - 2] // ww

            const sum1 =
                + cells[i + 3]
                + cells[i - 3]
                + cells[i + 3 * w]
                + cells[i - 3 * w]
                + cells[i + 3 + w]
                + cells[i + 3 - w]
                + cells[i - 3 + w]
                + cells[i - 3 - w]
                + cells[i + 3 * w + 1]
                + cells[i + 3 * w - 1]
                + cells[i - 3 * w + 1]
                + cells[i - 3 * w - 1]
                + cells[i - 2 + w]
                + cells[i + 2 + w]
                + cells[i - 2 - w]
                + cells[i + 2 - w]
                + cells[i - 1 - w * 2]
                + cells[i + 1 - w * 2]
                + cells[i - 1 + w * 2]
                + cells[i + 1 + w * 2]
                + cells[i - 2 + w * 2]
                + cells[i + 2 + w * 2]
                + cells[i - 2 - w * 2]
                + cells[i + 2 - w * 2];

            const newState = oldState
                ? abs(sum0 - sum1) < 3
                : sum0 * 3 - sum1 * 2 > 1
            if (oldState != newState) {
                nextCells[i] = newState;
                g.pixels.set(newState ? alive : dead, i * 4.0);
            }
        }
    }
    cells = nextCells;
    g.updatePixels();
    image(g, 0, 0, width, height);
}
