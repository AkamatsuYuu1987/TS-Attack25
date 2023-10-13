import { injectable } from "inversify";
import { Panel, PanelColor } from "@/domain/panel"

type Direction = {
    rowOffset: number;
    columnOffset: number;
}

@injectable()
export class Directions {
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

    getDirections(): Direction[] {
        return this.directions;
    }

    public findPanelsToFlipInAllDirections(gameBoard: Panel[][], selectedPanel: Panel, selectedColor: PanelColor): Panel[] {
        const panelsToFlip: Panel[] = [];
        for (const dir of this.directions) {
            const panelsInDirection = this.findPanelsToFlip(gameBoard, selectedPanel, dir, selectedColor);
            panelsToFlip.push(...panelsInDirection);
        }
        return panelsToFlip;
    }

    private findPanelsToFlip(board: Panel[][], selectedPanel: Panel, dir: Direction, selectedColor: PanelColor | null): Panel[] {
        const startRow = selectedPanel.getRow();
        const startCol = selectedPanel.getColumn();

        let [row, col] = this.incrementPosition(startRow, startCol, dir);
        const panelsToFlip: Panel[] = [];

        while (this.isPositionValid(board, row, col)) {
            const currentPanel = board[row][col];

            if (currentPanel.getColor() == selectedColor) {
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

    private isPositionValid(board: Panel[][], row: number, col: number): boolean {
        return row >= 0 && row < board.length && col >= 0 && col < board[0].length && board[row][col] !== undefined;
    }

    private incrementPosition(row: number, col: number, dir: Direction): [number, number] {
        return [row + dir.rowOffset, col + dir.columnOffset];
    }
}