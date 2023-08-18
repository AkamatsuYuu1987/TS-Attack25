// GameController.ts
import GameBoard from './GameBoard';
import ColorCounterBoard from './ColorCounterBoard';
import { Panel, PanelColor } from './panel';
import SelectPanelExecutor from '@/domain/SelectPanelExecutor';

type Direction = {
    rowOffset: number;
    columnOffset: number;
}

class GameController {
    gameBoard: GameBoard;
    colorCounterBoard: ColorCounterBoard;
    selectedColor: PanelColor | null = null;
    selectPanelExecutor: SelectPanelExecutor;

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

    constructor(gameBoard: GameBoard, colorCounterBoard: ColorCounterBoard, selectPanelExecutor: SelectPanelExecutor) {
        this.gameBoard = gameBoard;
        this.colorCounterBoard = colorCounterBoard;
        this.selectPanelExecutor = selectPanelExecutor;
    }

    // colorCounterBoardを設定するメソッド
    setColorCounterBoard(colorCounterBoard: ColorCounterBoard): void {
        this.colorCounterBoard = colorCounterBoard;
    }

    setGameBoard(gameBoard: GameBoard): void {
        this.gameBoard = gameBoard;
    }

    selectColor(color: PanelColor): void {
        this.selectedColor = color;
    }

    selectPanel(panelNumber: number): { newGameBoard: GameBoard, newColorCounterBoard: ColorCounterBoard } {
        if (this.selectedColor === null) {
            throw new Error('No color has been selected');
        }

        // Get the panel to be changed
        const panel = this.gameBoard.getBoard().flat().find(p => p.getNumber() === panelNumber);
        if (!panel) {
            throw new Error('Panel not found');
        }

        const newGameBoard = this.gameBoard.clone();

        // Change the color of the selected panel
        const selectedPanel = newGameBoard.getBoard()[panel.getRow()][panel.getColumn()];
        selectedPanel.setColor(this.selectedColor);

        this.findAndFlipPanels(newGameBoard.getBoard(), selectedPanel);

        // Create a new ColorCounterBoard and update the counters based on the new game board
        this.colorCounterBoard.updateColorCounters(newGameBoard.getBoard().flat());
        const newColorCounterBoard = this.colorCounterBoard;

        return { newGameBoard, newColorCounterBoard };
    }

    updateColorCounterboard(): ColorCounterBoard {
        this.colorCounterBoard.changeColorCounters(this.gameBoard.getBoard().flat());
        return this.colorCounterBoard;
    }

    updateGameBoard(panel: Panel): GameBoard {
        this.gameBoard.replaceSinglePanel(panel);
        return this.gameBoard;
    }

    // 挟まれたパネルをフリップするメソッド
    private findAndFlipPanels(gameBoard: Panel[][], selectedPanel: Panel) {
        // 八方向に対して挟まれたパネルを探し、フリップする
        for (const dir of this.directions) {
            const panelsToFlip = this.selectPanelExecutor.findPanelsToFlip(gameBoard, selectedPanel, dir, this.selectedColor);
            this.selectPanelExecutor.flipPanels(panelsToFlip, this.selectedColor)
        }
    }

}

export default GameController;
