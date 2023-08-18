import { Panel, PanelColor } from '@/domain/panel';

export default class GameBoard {
    protected board: Panel[][];
    private rows: number;
    private cols: number;

    constructor(rows: number = 5, cols: number = 5) {
        this.rows = rows;
        this.cols = cols;

        this.board = this.createBoard(rows, cols);
    }

    private createBoard(rows: number, cols: number): Panel[][] {
        return Array.from({ length: rows }, (_, rowIndex) =>
            Array.from({ length: cols }, (_, colIndex) =>
                new Panel(PanelColor.GRAY, rowIndex * cols + colIndex + 1, rowIndex, colIndex))
        );
    }

    clone(): GameBoard {
        const newBoard = this.board.map(row => row.map(panel => new Panel(panel.getColor(), panel.getNumber(), panel.getRow(), panel.getColumn())));
        const clonedGameBoard = new GameBoard(this.rows, this.cols);
        clonedGameBoard.board = newBoard;
        return clonedGameBoard;
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
                ? new Panel(color, panel.getNumber(), panel.getRow(), panel.getColumn())
                : panel)
        );
    }

    public replaceSinglePanel(panel: Panel): void {
        const newBoard = this.board.map(row =>
            row.map(p => p.getNumber() === panel.getNumber()
                ? new Panel(panel.getColor(), panel.getNumber(), panel.getRow(), panel.getColumn())
                : p)
        );
        this.board = newBoard;
    }

    // Added getter methods to access rows and cols
    public getRows(): number {
        return this.rows;
    }

    public getCols(): number {
        return this.cols;
    }
}
