// GameController.ts
import GameBoard from './GameBoard';
import ColorCounter from './ColorCounter';
import ColorCounterBoard from './ColorCounterBoard';
import { Panel, PanelColor } from './panel';

type Direction = {
    rowOffset: number;
    columnOffset: number;
}

class GameController {
    gameBoard: GameBoard;
    colorCounters: ColorCounter[];
    selectedColor: PanelColor | null = null;

    // 八方向を示すオフセット
    private directions: Direction[] = [
        { rowOffset: -1, columnOffset: -1 }, // 左上
        { rowOffset: -1, columnOffset: 0 }, // 上
        { rowOffset: -1, columnOffset: 1 }, // 右上
        { rowOffset: 0, columnOffset: -1 }, // 左
        { rowOffset: 0, columnOffset: 1 }, // 右
        { rowOffset: 1, columnOffset: -1 }, // 左下
        { rowOffset: 1, columnOffset: 0 }, // 下
        { rowOffset: 1, columnOffset: 1 }  // 右下
    ];

    constructor(gameBoard: GameBoard, colorCounters: ColorCounter[]) {
        this.gameBoard = gameBoard;
        this.colorCounters = colorCounters;
    }

    // ColorCountersを設定するメソッド
    setColorCounters(colorCounters: ColorCounter[]): void {
        this.colorCounters = colorCounters;
    }

    private isPositionValid(board: Panel[][], row: number, col: number): boolean {
        return row >= 0 && row < board.length && col >= 0 && col < board[0].length && board[row][col] !== undefined;
    }

    private incrementPosition(row: number, col: number, dir: Direction): [number, number] {
        return [row + dir.rowOffset, col + dir.columnOffset];
    }

    private findPanelsToFlip(board: Panel[][], startRow: number, startCol: number, dir: Direction): Panel[] {
        let [row, col] = this.incrementPosition(startRow, startCol, dir);
        const panelsToFlip: Panel[] = [];

        while (this.isPositionValid(board, row, col)) {
            const currentPanel = board[row][col];

            if (currentPanel.getColor() == this.selectedColor) {
                // Same color found, return the list
                return panelsToFlip;
            } else if (currentPanel.getColor() == PanelColor.GRAY) {
                // Empty panel, stop looking in this direction
                return [];
            } else {
                // Different color, add to list
                panelsToFlip.push(currentPanel);
            }

            [row, col] = this.incrementPosition(row, col, dir);
        }

        return [];
    }

    private flipPanels(panels: Panel[]) {
        if (this.selectedColor === null) {
            throw new Error('No color has been selected');
        }

        for (const panel of panels) {
            panel.setColor(this.selectedColor);
        }
    }

    setGameBoard(gameBoard: GameBoard): void {
        this.gameBoard = gameBoard;
    }

    selectColor(color: PanelColor): void {
        this.selectedColor = color;
    }

    selectPanel(panelNumber: number): { newGameBoard: GameBoard, newColorCounters: ColorCounter[] } {
        if (this.selectedColor === null) {
            throw new Error('No color has been selected');
        }

        // Get the panel to be changed
        const panel = this.gameBoard.getBoard().flat().find(p => p.getNumber() === panelNumber);
        if (!panel) {
            throw new Error('Panel not found');
        }

        // Clone the gameBoard and apply the color change
        const newGameBoard = new GameBoard(this.gameBoard.getBoard().length, this.gameBoard.getBoard()[0].length);
        newGameBoard.setBoard(this.gameBoard.getBoard().map(row => row.map(panel => new Panel(panel.getColor(), panel.getNumber(), panel.getRow(), panel.getColumn()))));

        // Change the color of the selected panel
        const selectedPanel = newGameBoard.getBoard()[panel.getRow()][panel.getColumn()];
        selectedPanel.setColor(this.selectedColor);

        const startRow = panel.getRow();
        const startCol = panel.getColumn();
        for (const dir of this.directions) {
            const panelsToFlip = this.findPanelsToFlip(newGameBoard.getBoard(), startRow, startCol, dir);
            this.flipPanels(panelsToFlip);
        }

        // Update the color counters after the panel color has been changed
        // ColorCounterBoardクラスを新規作成
        // updateColorCountersメソッドを実行し、カウンターを更新する
        const colorCounterBoard = new ColorCounterBoard(this.colorCounters);
        colorCounterBoard.updateColorCounters(newGameBoard.getBoard().flat());
        const newColorCounters = colorCounterBoard.getCounters();

        return { newGameBoard, newColorCounters };
    }

}

export default GameController;
