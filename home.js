// Controls the 'pop' or 'wobble' animation when the user clicks. Starts at 0.
let popFactor = 0; 
// A boolean (true/false) to track if the mouse is currently over the canvas.
let isHovering = false;
// The total number of vertical bars in the soundwave.
const numBars = 19;

// --- COLOR PALETTES ---
// Storing colors as objects makes it easy to switch between them.
// We use HSB (Hue, Saturation, Brightness) color mode for easy manipulation.

// The default color scheme for the bars.
const defaultColor = { h: 250, s: 50, b: 100 };
// The purple color scheme used when the user hovers over the canvas.
const hoverColor = { h: 270, s: 80, b: 100 }; 


// --- SETUP FUNCTION ---
// The setup() function runs once when the program starts. It's used to
// initialize the environment, like creating the canvas and setting color modes.
function setup() {
  // Find the HTML element with the id 'canvas-container' in our index.html.
  let container = document.getElementById('canvas-container');
  // Create the p5.js canvas, making it as wide as its container and 500px tall.
  let canvas = createCanvas(container.offsetWidth, 500);
  // Tell the canvas that the 'canvas-container' div is its parent element.
  canvas.parent('canvas-container');
  
  // Set the color mode to HSB. This allows us to define colors by their
  // Hue (0-360), Saturation (0-100), and Brightness (0-100).
  colorMode(HSB, 360, 100, 100, 100);
  // Disable outlines (strokes) for all shapes by default.
  noStroke();
}


// --- DRAW FUNCTION ---
// The draw() function runs continuously in a loop (about 60 times per second).
// This is where all the animation and drawing happens.
function draw() {
  // Clear the canvas on each frame with a specific dark grey color.
  background('#212121');

  // Check if the mouse cursor's X and Y coordinates are within the canvas bounds.
  // Update the isHovering variable accordingly.
  isHovering = (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height);
  
  // Create a time variable that increases slowly based on the computer's clock.
  // This gives us a smooth, continuous value for the animation.
  // The speed is based on a tempo of 4 BPM (Beats Per Minute).
  const time = millis() / 15000;

  // This block makes the 'pop' effect fade away smoothly after a click.
  if (popFactor > 0) {
    // If popFactor is greater than 0, decrease it slightly on each frame.
    popFactor -= 0.05;
  } else {
    // Ensure popFactor doesn't go below 0.
    popFactor = 0;
  }

  // Calculate the width of each bar and the spacing between them based on the
  // current width of the canvas. This makes the layout responsive.
  let barWidth = width / (numBars * 1.5);
  let spacing = (width - numBars * barWidth) / (numBars + 1);

  // This loop runs once for each bar we need to draw.
  for (let i = 0; i < numBars; i++) {
    // Calculate the horizontal (x) position for the current bar.
    let x = spacing + i * (barWidth + spacing);
    
    // Create a symmetrical index. This makes the wave look mirrored from the
    // center, which is a classic soundwave appearance.
    let symm_i = i < numBars / 2 ? i : numBars - 1 - i;
    
    // Use Perlin noise to get a smooth, natural-looking random value.
    // We use the symmetrical index and the 'time' variable to make the height
    // of each bar animate smoothly and symmetrically over time.
    let noiseVal = noise(symm_i * 0.2, time);
    
    // Map the noise value (which is between 0 and 1) to a usable height in pixels.
    let barHeight = map(noiseVal, 0.2, 0.8, height * 0.1, height * 0.8);

    // Apply the pop/wobble effect to the height. It uses a sine wave for a
    // bouncy motion that is influenced by the popFactor.
    let popHeight = barHeight * (1 + popFactor * sin(i * 0.8 + frameCount * 0.2));

    // Call our custom function to actually draw the bar with all the calculated properties.
    drawBar(x, height / 2, barWidth, popHeight);
  }
}


// --- CUSTOM DRAW BAR FUNCTION ---
// A helper function to draw a single bar with a 3D-like gradient and a glow.
// This keeps the main draw() loop cleaner.
function drawBar(x, y, w, h) {
  // Using a ternary operator to choose the color palette based on the hover state.
  let currentColor = isHovering ? hoverColor : defaultColor;

  // Use the advanced 'drawingContext' to apply a soft glow effect.
  // This is a direct way to access the underlying HTML5 Canvas API.
  drawingContext.shadowBlur = 32;
  drawingContext.shadowColor = color(currentColor.h, currentColor.s, 80, 50);

  // To create the 3D "tube" look, we draw many thin vertical lines next to each other.
  // Each line has a slightly different brightness.
  let halfH = h / 2;
  for (let i = 0; i < w; i++) {
    // Calculate a value from 0 (at the center of the bar) to 1 (at the edges).
    let gradient = abs((i - w / 2) / (w / 2));
    // Map this gradient to a brightness value. The center is brightest, edges are darker.
    let brightness = map(gradient, 0, 1, currentColor.b, currentColor.b - 40);
    // Set the stroke (line color) for our thin vertical line.
    stroke(currentColor.h, currentColor.s, brightness);
    // Draw the thin vertical line.
    line(x + i, y - halfH, x + i, y + halfH);
  }
  // Reset the stroke so it doesn't affect other things drawn later.
  noStroke();
}


// --- EVENT HANDLERS ---
// These functions are called automatically by p5.js in response to user input.

// This function is called automatically whenever the mouse is clicked.
function mousePressed() {
  // Only trigger the animation if the mouse is currently over the canvas.
  if (isHovering) {
    // Trigger the pop animation by setting popFactor to its maximum value.
    popFactor = 1.0;
  }
}

// This function is called automatically when the browser window is resized.
function windowResized() {
  // Find the container element again.
  let container = document.getElementById('canvas-container');
  // Resize the canvas to fit the new width of its container.
  resizeCanvas(container.offsetWidth, 500);
}
