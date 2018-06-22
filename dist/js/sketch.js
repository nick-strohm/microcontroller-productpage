///<reference path="../../node_modules/p5/lib/p5.global-mode.d.ts" />

jQuery.prototype.appendChild = jQuery.prototype.append;

const tooltip = new TooltipManager();

/**
 * @type {CircuitBoard[]}
 */
const circuitBoards = [];

/**
 * @type {jQuery}
 */
const parentContainer = $('#circuitboard');

/**
 * @type {p5.Renderer}
 */
let canvas;

function setup() {
    canvas = createCanvas(parentContainer.width(), parentContainer.width() * 0.25);
    canvas.parent(parentContainer);

    $(window).resize(function (e) {
        resizeCanvas(parentContainer.width(), parentContainer.width() * 0.25);
    });

    addMainBoard();
    addAdditionalBoard();
}

function addMainBoard() {
    let board = new CircuitBoard(1);
    let offsetX = height / 6;
    let half = height / 2;
    let third = height / 3;
    let fourth = height / 4;

    // CPU
    board.addComponentRaw(offsetX, third, third, third, color(0), 'Infineon\nSAB-C517A-LN\n\n\nAA SIEMENS92\nYEA1972K06', 'CPU');

    // Power inlet
    board.addComponentRaw(third, fourth * 3, fourth / 2, fourth, 0, "", "Power input");

    // LED Matrix
    board.addComponentRaw(third * 1.5, half, width / 3, half, color(32, 82, 46), "", "LED Matrix");
    board.addComponentRaw(third * 1.5 + (height / 15), half + (height / 15), width / 3 - (height / 15 * 2), half - (height / 15 * 2), 0, "");
    board.addComponentRaw(third * 1.5 + (height / 12), half + (height / 12), width / 3 - (height / 12 * 2), half - (height / 12 * 2), color(48, 99, 38), "");

    // BUS Com
    board.addComponentRaw(board.width - offsetX, third, offsetX, third, color(0, 0), "", "BUS Com\nFlash");
    board.addComponentRaw(board.width - offsetX, third, offsetX / 2, third, 0, "");
    board.addComponentRaw(board.width - offsetX / 2, third + 10, offsetX / 2, third - 20, 125, "");

    board.addComponentRaw(board.width - offsetX, third * 2, offsetX, third, color(0, 0), "", "BUS Com");
    board.addComponentRaw(board.width - offsetX, third * 2, offsetX / 2, third, 0, "");
    board.addComponentRaw(board.width - offsetX / 2, third * 2 + 10, offsetX / 2, third - 20, 125, "");

    // Buttons
    board.addComponentRaw(board.width - offsetX, third / 8, offsetX / 2, third / 4, 0, "", "Reset/Start Button");
    board.addComponentRaw(board.width - offsetX, third / 2, offsetX / 2, third / 4, 0, "", "Flash Button");

    circuitBoards.push(board);
}

function addAdditionalBoard() {
    let board = new CircuitBoard(0, true);
    let buttonSize = board.height * 0.075;
    let buttonSpacing = buttonSize * 0.5;
    let buttonMatrixSize = buttonSize * 4 + buttonSpacing * 3;
    let buttonMatrixLeft = board.width - board.height / 3 - buttonMatrixSize;
    let buttonMatrixTop = board.height * 0.1;

    // Button matrix
    board.addComponentRaw(buttonMatrixLeft, buttonMatrixTop, buttonMatrixSize, buttonMatrixSize, color(0, 0), "", "LED Matrix");

    board.addComponentRaw(buttonMatrixLeft + buttonSize * 0 + buttonSpacing * 0, buttonMatrixTop - buttonSize, buttonSize, buttonSize, color(0, 0), "1");
    board.addComponentRaw(buttonMatrixLeft + buttonSize * 1 + buttonSpacing * 1, buttonMatrixTop - buttonSize, buttonSize, buttonSize, color(0, 0), "2");
    board.addComponentRaw(buttonMatrixLeft + buttonSize * 2 + buttonSpacing * 2, buttonMatrixTop - buttonSize, buttonSize, buttonSize, color(0, 0), "3");
    board.addComponentRaw(buttonMatrixLeft + buttonSize * 3 + buttonSpacing * 3, buttonMatrixTop - buttonSize, buttonSize, buttonSize, color(0, 0), "4");

    board.addComponentRaw(buttonMatrixLeft - buttonSize, buttonMatrixTop + buttonSize * 0 + buttonSpacing * 0, buttonSize, buttonSize, color(0, 0), "A");
    board.addComponentRaw(buttonMatrixLeft - buttonSize, buttonMatrixTop + buttonSize * 1 + buttonSpacing * 1, buttonSize, buttonSize, color(0, 0), "B");
    board.addComponentRaw(buttonMatrixLeft - buttonSize, buttonMatrixTop + buttonSize * 2 + buttonSpacing * 2, buttonSize, buttonSize, color(0, 0), "C");
    board.addComponentRaw(buttonMatrixLeft - buttonSize, buttonMatrixTop + buttonSize * 3 + buttonSpacing * 3, buttonSize, buttonSize, color(0, 0), "D");

    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            board.addComponentRaw(buttonMatrixLeft + buttonSize * x + buttonSpacing * x, buttonMatrixTop + buttonSize * y + buttonSpacing * y, buttonSize, buttonSize, 0, "");
        }        
    }

    let ledBoxTop = buttonMatrixTop + buttonMatrixSize;
    let ledBoxLeft = buttonMatrixLeft + buttonSize + buttonSpacing;
    let ledBoxWidth = buttonSize + buttonSpacing;
    let ledBoxHeight = (board.height - ledBoxTop) / 2;
    let ledWidth = ledBoxWidth / 2;
    let ledLeft = ledBoxLeft + (ledBoxWidth / 2 - ledWidth / 2);
    let ledHeight = ledBoxHeight * 0.9 / 10;
    let ledSpacing = ledBoxHeight * 0.1 / 9;

    // Bitwise LEDs
    board.addComponentRaw(ledBoxLeft, ledBoxTop, ledBoxWidth, ledBoxHeight, color(140, 154, 159), "", "Red bitwise LEDs");
    board.addComponentRaw(ledBoxLeft, ledBoxTop + ledBoxHeight, ledBoxWidth, ledBoxHeight, color(140, 154, 159), "", "Green bitwise LEDs");
    
    for (let x = 0; x < 2; x++) {
        for (let y = 0; y < 10; y++) {
            board.addComponentRaw(ledLeft, ledBoxTop + ledBoxHeight * x + ledHeight * y + ledSpacing * y, ledWidth, ledHeight, 255, "");
        }
    }

    circuitBoards.push(board);
}

function draw() {
    background(255);

    for (let i = 0; i < circuitBoards.length; i++) {
        const circuitboard = circuitBoards[i];
        circuitboard.draw();
    }

    //let offsetX = width * 0.05 * 0.125;
    //drawCircuitBoard(offsetX, 0, width / 2, height, true);
    //drawCircuitBoard(width / 2 + offsetX, 0, width / 2, height);
    tooltip.draw();
}

function addComponent(x, y, width, height, color, text, tooltipText = "") {

}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 */
function drawCircuitBoard(x, y, width, height, rightConnector = false) {
    let connectorWidth = width * 0.05;
    let connectorHeight = height * 0.9;
    let connectorOffsetX = x;
    let connectorOffsetY = (y + (height - connectorHeight)) / 2;

    let boardWidth = width - connectorWidth;
    let boardHeight = height;
    let boardOffsetX = x + connectorWidth * 0.5;
    let boardOffsetY = y;

    push();
    noStroke();

    // Board
    fill(59, 65, 81);
    rect(boardOffsetX, boardOffsetY, boardWidth, boardHeight);
    // /Board

    // Connector
    fill(191, 190, 177);
    rect(connectorOffsetX, connectorOffsetY, connectorWidth, connectorHeight);
    if (rightConnector) {
        rect(boardOffsetX + boardWidth - (connectorWidth / 2), connectorOffsetY, connectorWidth, connectorHeight);
    }
    // /Connector

    //console.log(` ${x}  ${y} ${width} ${height}`);
    //console.log(` ${connectorOffsetX} ${connectorOffsetY}  ${connectorWidth} ${connectorHeight}`);
    //console.log(`${boardOffsetX}  ${boardOffsetY} ${boardWidth} ${boardHeight}`);

    pop();
}