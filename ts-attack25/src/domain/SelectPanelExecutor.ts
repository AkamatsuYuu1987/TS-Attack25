import { Panel, PanelColor } from './panel';

export default class SelectPanelExecutor {

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

}
