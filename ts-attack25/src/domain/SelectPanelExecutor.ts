import { Panel, PanelColor } from './panel';

type Direction = {
    rowOffset: number;
    columnOffset: number;
}


export default class SelectPanelExecutor {


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

    constructor() {
    }

    public flipPanels(panels: Panel[], selectedColor: PanelColor | null) {
        if (selectedColor === null) {
            throw new Error('No color has been selected');
        }

        for (const panel of panels) {
            panel.setColor(selectedColor);
        }
    }

    public isPositionValid(board: Panel[][], row: number, col: number): boolean {
        return row >= 0 && row < board.length && col >= 0 && col < board[0].length && board[row][col] !== undefined;
    }

    public incrementPosition(row: number, col: number, dir: Direction): [number, number] {
        return [row + dir.rowOffset, col + dir.columnOffset];
    }

}
