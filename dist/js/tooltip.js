class Tooltip {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {string} text 
     */
    constructor(x, y, w, h, text) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.text = text;
        this.tooltipPosition = {x: this.x, y: this.y};
        this.tooltipWidth = Math.min(width / 3, textWidth(this.text) + 8);
        this.tooltipHeight = Math.min(height, textHeight(this.text, this.tooltipWidth) + 8);
    }

    draw() {
        if (mouseX < this.x ||
            mouseX > this.x + this.width ||
            mouseY < this.y ||
            mouseY > this.y + this.height) {
            return;
        }

        push();

        stroke(0);
        fill(0, 0, 0, 150);
        rect(this.tooltipPosition.x, this.tooltipPosition.y, this.tooltipWidth, this.tooltipHeight, 5);

        stroke(255);
        noFill();
        textAlign(CENTER);
        textStyle(NORMAL);
        textFont('Arial', 12);

        let tooltip = text(this.text, this.tooltipPosition.x + 4, this.tooltipPosition.y + 4, this.tooltipWidth - 4, this.tooltipHeight - 4);
        this.setTooltipPosition(tooltip);
        
        pop();
    }

    /**
     * @param {p5} tooltip 
     */
    setTooltipPosition(tooltip) {
        const offsetX = 15,
              offsetY = 15;

        if (mouseX + offsetX + this.tooltipWidth <= width) {
            this.tooltipPosition.x = mouseX + offsetX;
        } else if (mouseX - offsetX - this.tooltipWidth >= 0) {
            this.tooltipPosition.x = mouseX - offsetX - this.tooltipWidth;
        } else if (mouseX < width / 2) {
            this.tooltipPosition.x = 0;
        } else {
            this.tooltipPosition.x = width - this.tooltipWidth;
        }

        if (mouseY + offsetY + this.tooltipHeight <= height) {
            this.tooltipPosition.y = mouseY + offsetY;
        } else if (mouseY - offsetY - this.tooltipHeight >= 0) {
            this.tooltipPosition.y = mouseY - offsetY - this.tooltipHeight;
        } else if (mouseY < height / 2) {
            this.tooltipPosition.y = 0;
        } else {
            this.tooltipPosition.y = height - this.tooltipHeight;
        }
    }
}

class TooltipManager {
    constructor() {
        /**
         * @type {Tooltip[]}
         */
        this.tooltips = [];
    }

    addTooltipToPosition(x, y, width, height, text) {
        this.tooltips.push(new Tooltip(x, y, width, height, text));
    }

    draw() {
        for (let i = 0; i < this.tooltips.length; i++) {
            const tooltip = this.tooltips[i];
            tooltip.draw();
        }
    }
}

/**
 * 
 * @param {string} text 
 * @param {number} maxWidth 
 */
function wrapText(text, maxWidth) {
    text = text.replace('\r\n', '\n').replace('\r', '\n');
    if (textWidth(text) <= maxWidth) {
        return text;
    }

    let split = text.split(' ');
    text = "";
    let line = "";
    for (let i = 0; i < split.length; i++) {
        const word = split[i];
        if (textWidth(line + word + " ") <= maxWidth) {
            line += word + " ";
            continue;
        }

        i--;
        text += line.slice(0, line.length - 1) + "\n";
        line = "";
    }

    return text.slice(0, text.length - 1);
}

/**
 * 
 * @param {string} text 
 * @param {number} maxWidth 
 */
function textHeight(text, maxWidth) {
    return wrapText(text, maxWidth).split('\n').length * (textLeading());
};