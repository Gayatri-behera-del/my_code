const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');
const addFlowerBtn = document.getElementById('addFlowerBtn');

// Set canvas size to fill the window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let flowers = [];

// Helper function to get a random color near the warm spectrum (pink, red, orange)
function getRandomWarmColor() {
    // Hue range 300 (pink/magenta) to 30 (orange/red)
    const hue = Math.random() < 0.5 ? 300 + Math.random() * 60 : Math.random() * 30;
    return 'hsl(${hue}, 90%, 65%)';
}

// --- Flower Class ---
class Flower {
    constructor(x) {
        this.x = x;
        this.baseY = canvas.height;
        this.stemHeight = 0;
        this.maxStemHeight = 100 + Math.random() * 200; // Stem height (100 to 300)
        this.maxPetalSize = 15 + Math.random() * 15;   // Petal size (15 to 30)
        this.petalSize = 0;
        this.stemBendX = (Math.random() - 0.5) * 50; // Slight random bend
        this.color = getRandomWarmColor();
        this.isGrowing = true;
        this.stemGrowthSpeed = 3 + Math.random() * 2;
        this.petalGrowthSpeed = 1.5 + Math.random() * 1;
    }

    // Use Bezier curve to draw a natural, curved stem
    drawStem() {
        // Control points for the curve
        const startX = this.x;
        const startY = this.baseY;
        const endX = this.x + this.stemBendX;
        const endY = this.baseY - this.stemHeight;

        // Control points determine the curvature
        const cp1X = startX;
        const cp1Y = startY - this.stemHeight * 0.3;
        const cp2X = startX + this.stemBendX * 0.5;
        const cp2Y = startY - this.stemHeight * 0.7;

        ctx.strokeStyle = '#006600'; // Green stem color
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        // Bezier curve from start to end, controlled by cp1 and cp2
        ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
        ctx.stroke();
        
        return { x: endX, y: endY }; // Return the tip of the stem
    }

    drawPetals(tip) {
        if (this.petalSize === 0) return;

        ctx.save();
        ctx.translate(tip.x, tip.y); // Move origin to the tip of the stem

        // Set up the glowing effect for the petals (mimicking the video)
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;

        // Draw multiple petals (simplified using circles/ovals)
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            
            ctx.rotate(angle);
            
            // Draw a basic oval/petal shape
            ctx.fillStyle = this.color;
            ctx.beginPath();
            // x, y, radiusX, radiusY, rotation, startAngle, endAngle
            ctx.ellipse(0, -this.petalSize / 2, this.petalSize * 0.8, this.petalSize * 1.5, 0, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.rotate(-angle); // Reset rotation for the next petal
        }

        // Draw the center of the flower
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#FFDD00'; // Yellow center
        ctx.beginPath();
        ctx.arc(0, 0, this.petalSize * 0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    draw() {
        const stemTip = this.drawStem();
        this.drawPetals(stemTip);
    }

    update() {
        if (this.isGrowing) {
            // 1. Grow stem
            if (this.stemHeight < this.maxStemHeight) {
                this.stemHeight = Math.min(this.stemHeight + this.stemGrowthSpeed, this.maxStemHeight);
            } 
            // 2. Bloom petals
            else if (this.petalSize < this.maxPetalSize) {
                this.petalSize = Math.min(this.petalSize + this.petalGrowthSpeed, this.maxPetalSize);
            } else {
                this.isGrowing = false;
            }
        }
    }
}

// --- Animation Loop ---
function animate() {
    // Clear the canvas. Use a slight darkening effect for a continuous trace look if desired:
     //ctx.fillStyle = 'rgba(26, 26, 26, 0.1)'; 
    // ctx.fillRect(0, 0, canvas.width, canvas.height); 
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Standard clear

    // Re-draw all flowers
    flowers.forEach(flower => {
        flower.update();
        flower.draw();
    });

    // Loop
    requestAnimationFrame(animate);
}

// --- Event Listeners and Initialization ---

// Function to add a new flower
function addNewFlower() {
    // Spawn flower at a random location across the bottom half of the screen
    const flowerX = canvas.width * Math.random();
    flowers.push(new Flower(flowerX));
}

// Add flower on button click
addFlowerBtn.addEventListener('click', addNewFlower);

// Initial flowers for the starting scene
addNewFlower();
setTimeout(addNewFlower, 500);
setTimeout(addNewFlower, 1000);
setTimeout(addNewFlower, 1500);

// Start the animation loop
animate();