class Component {
    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     * @param {p5.Color} color 
     * @param {string} text 
     * @param {string?} tooltipText 
     */
    constructor(x, y, w, h, color, text, tooltipText = null) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.color = color;
        this.text = text;

        if (typeof(tooltipText) == 'string') {
            this.tooltipText = tooltipText;
            tooltip.addTooltipToPosition(this.x, this.y, this.width, this.height, this.tooltipText);
        }
    }

    draw() {
        push();

        noStroke();
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
        
        stroke('gold');
        noFill();
        textAlign(CENTER, BASELINE);
        text(this.text, this.x, this.y, this.width, this.height);

        pop();
    }
}