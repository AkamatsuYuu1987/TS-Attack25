import { Panel, PanelColor } from '@/domain/panel';

export default class GameBoard {
    private board: Panel[][];
    private rows: number;
    private cols: number;

    constructor(rows: number = 5, cols: number = 5) {
        this.rows = rows;
        this.cols = cols;

        // this.board = new Array(rows).fill(null).map(() => new Array(cols).fill(null).map(() => new Panel()));
        // this.boardに1-25のnumberを持つPanelを格納する
        this.board = new Array(rows).fill(null).map((_, i) => new Array(cols).fill(null).map((_, j) => new Panel(PanelColor.GRAY, i * cols + j + 1)));
    }

    public getBoard(): Panel[][] {
        return this.board;
    }

    public setBoard(newBoard: Panel[][]): void {
        this.board = newBoard;
    }

    public changeColor(number: number, color: PanelColor): void {
        this.board = this.board.map(row =>
            row.map(panel => panel.getNumber() === number
                ? new Panel(color, number) // Create a new Panel with the selected color and number
                : panel)
        );
    }


    // Added getter methods to access rows and cols
    public getRows(): number {
        return this.rows;
    }

    public getCols(): number {
        return this.cols;
    }
}
