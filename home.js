let bars = [];
const numBars = 19;
let popFactor = 0; // Click effect
let isHovering = false;

// Color Palettes
const defaultColor = { h: 250, s: 50, b: 100 };
const hoverColor = { h: 270, s: 80, b: 100 };

function setup() {
    let container = document.getElementById('canvas-container');
    let canvas = createCanvas(container.offsetWidth, 500);
    canvas.parent('canvas-container');
    colorMode(HSB, 360, 100, 100, 100);
    noStroke();
}

function draw() {
    background('#2b2b2b');

    // Check for hover state
    isHovering = (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height);
    
    // BPM animation calculation
    // 4 BPM = 4 beats per 60 seconds = 1 beat every 15 seconds.
    // We use millis() for smooth time-based animation.
    const time = millis() / 15000;

    // Handle click pop effect
    if (popFactor > 0) {
        popFactor -= 0.05; // Decay rate
    } else {
        popFactor = 0;
    }

    let barWidth = width / (numBars * 1.5);
    let spacing = (width - numBars * barWidth) / (numBars + 1);

    // Draw bars
    for (let i = 0; i < numBars; i++) {
        let x = spacing + i * (barWidth + spacing);

        // Symmetrical noise for a classic soundwave look
        let symm_i = i < numBars / 2 ? i : numBars - 1 - i;
        
        // Calculate base height with Perlin noise for smooth animation
        let noiseVal = noise(symm_i * 0.2, time);
        let barHeight = map(noiseVal, 0.2, 0.8, height * 0.1, height * 0.8);

        // Add the pop effect
        let popHeight = barHeight * (1 + popFactor * sin(i * 0.8 + frameCount * 0.2));

        drawBar(x, height / 2, barWidth, popHeight);
    }
}

function drawBar(x, y, w, h) {
    let currentColor = isHovering ? hoverColor : defaultColor;

    // Glow effect using drawingContext
    drawingContext.shadowBlur = 32;
    drawingContext.shadowColor = color(currentColor.h, currentColor.s, 80, 50);

    // Draw the bar with a "3D tube" gradient effect
    // We do this by drawing thin vertical lines with changing brightness
    let halfH = h / 2;
    for (let i = 0; i < w; i++) {
        let gradient = abs((i - w / 2) / (w / 2)); // 0 at center, 1 at edges
        let brightness = map(gradient, 0, 1, currentColor.b, currentColor.b - 40);
        stroke(currentColor.h, currentColor.s, brightness);
        line(x + i, y - halfH, x + i, y + halfH);
    }
    noStroke(); // Reset stroke
}

function mousePressed() {
    // Trigger pop effect only if mouse is over the canvas
    if (isHovering) {
        popFactor = 1.0;
    }
}

function windowResized() {
    let container = document.getElementById('canvas-container');
    resizeCanvas(container.offsetWidth, 500);

}
