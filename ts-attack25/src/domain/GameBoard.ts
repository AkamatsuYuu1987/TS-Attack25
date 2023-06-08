import { Panel, PanelColor } from './panel';

export default class GameBoard {
    private board: Panel[][];

    constructor(rows: number, cols: number) {
        this.board = new Array(rows).fill(null).map(() => new Array(cols).fill(null).map(() => new Panel()));
    }

    public getBoard(): Panel[][] {
        return this.board;
    }

    public changeColor(x: number, y: number, color: PanelColor): void {
        if (this.board[x] && this.board[x][y]) {
            this.board[x][y].setColor(color);
        }
    }

    public isUniformColor(): boolean {
        const firstColor = this.board[0][0].getColor();
        return this.board.every(row => row.every(panel => panel.getColor() === firstColor));
    }
}
