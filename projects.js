// projects.js - p5.js sketches for the projects page

/**
 * Sketch generator. It takes an ID and returns a p5 sketch function.
 * Create multiple, slightly different sketches from the same template.
 * @param {number} id - An identifier for the sketch (e.g., 1, 2, 3, 4)
 */
const artworkSketch = (id) => {
    return (p) => {
        let angle = 0;
        // Assign background color
        const bgColor = [(id * 60) % 255, 100, 150];

        p.setup = function() {
            p.createCanvas(1920, 1080);
            p.noStroke();
        };

        p.draw = function() {
            p.background(bgColor[0], bgColor[1], bgColor[2]);
            
            // Placeholder projects
            p.translate(p.width / 2, p.height / 2);
            p.rotate(angle);
            
            p.fill(255, 255, 255, 150);
            p.rectMode(p.CENTER);
            p.rect(0, 0, 400, 400);
            
            angle += 0.01;
        };
    };
};

// Create an instance of the sketch for each project canvas container
new p5(artworkSketch(1), 'project-canvas-1');
new p5(artworkSketch(2), 'project-canvas-2');
new p5(artworkSketch(3), 'project-canvas-3');

new p5(artworkSketch(4), 'project-canvas-4');
