import { Panel, PanelColor } from './panel';

export default class GameBoard {
    private board: Panel[][];

    constructor(size: number) {
        this.board = new Array(size).fill(null).map(() => new Array(size).fill(null).map(() => new Panel()));
    }

    public getBoard(): Panel[][] {
        return this.board;
    }

    public changeColor(x: number, y: number, color: string): void {
        let panelColor: PanelColor;

        switch (color.toLowerCase()) {
            case 'red':
                panelColor = PanelColor.RED;
                break;
            case 'green':
                panelColor = PanelColor.GREEN;
                break;
            case 'blue':
                panelColor = PanelColor.BLUE;
                break;
            case 'white':
                panelColor = PanelColor.WHITE;
                break;
            default:
                panelColor = PanelColor.GRAY;
        }

        if (this.board[x] && this.board[x][y]) {
            this.board[x][y].setColor(panelColor);
        }
    }

    public isUniformColor(): boolean {
        const firstColor = this.board[0][0].getColor();
        return this.board.every(row => row.every(panel => panel.getColor() === firstColor));
    }
}
