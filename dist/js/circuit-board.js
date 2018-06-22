class CircuitBoard {
    constructor(index, rightConnector = false) {
        this.x = width * 0.5 * index;
        this.y = 0;
        this.width = width * 0.5;
        this.height = height;
        this.rightConnector = rightConnector;

        /**
         * @type {Component[]}
         */
        this.components = [];
    }

    /**
     * @param {Component} component 
     */
    addComponent(component) {
        this.components.push(component);
        return this;
    }

    addComponentRaw(x, y, w, h, color, text, tooltipText = null) {
        return this.addComponent(new Component(this.x + x, this.y + y, w, h, color, text, tooltipText));
    }

    draw() {
        let boardWidth = this.width * 0.95;
        let boardOffsetX = this.x + (this.width - boardWidth) * 0.5;

        let connectorWidth = this.width - boardWidth;
        let connectorHeight = this.height * 0.9;
        let connectorOffsetX = this.x;
        let connectorOffsetY = (this.y + (this.height - connectorHeight)) / 2;
        let rightConnectorOffsetX = boardOffsetX + boardWidth - (connectorWidth / 2);

        push();

        noStroke();
        fill(59, 65, 81);
        rect(boardOffsetX, this.y, boardWidth, this.height);

        fill(191, 190, 177);
        rect(connectorOffsetX, connectorOffsetY, connectorWidth, connectorHeight);
        if (this.rightConnector) {
            rect(rightConnectorOffsetX, connectorOffsetY, connectorWidth, connectorHeight);
        }

        pop();

        for (let i = 0; i < this.components.length; i++) {
            const component = this.components[i];
            component.draw();
        }
    }
}