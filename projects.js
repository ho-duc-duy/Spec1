//A placeholder sketch. This is where you will paste your own artwork code.
//Remember to adapt it to instance mode by adding 'p.' before every p5.js function!
//@param {p5} p - The p5 instance.
 
const placeholderSketch = (p) => {
    p.setup = function() {
        // Find the parent container and create the canvas to fit its dimensions
        const container = p.canvas.parentElement;
        p.createCanvas(container.offsetWidth, container.offsetHeight);
    };

    p.draw = function() {
        // Simple placeholder visual
        p.background(51); // Matches the CSS placeholder color
        p.noStroke();
        p.fill(80);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(24);
        p.text('p5.js Artwork Placeholder', p.width / 2, p.height / 2);
    };
    
    // Make the canvas responsive
    p.windowResized = function() {
        const container = p.canvas.parentElement;
        p.resizeCanvas(container.offsetWidth, container.offsetHeight);
    };
};

// Create an instance of the placeholder sketch for each canvas container
new p5(placeholderSketch, 'project-canvas-1');
new p5(placeholderSketch, 'project-canvas-2');
new p5(placeholderSketch, 'project-canvas-3');
new p5(placeholderSketch, 'project-canvas-4');
