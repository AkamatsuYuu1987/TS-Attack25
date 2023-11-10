// services/InitializationService.ts
import GameBoard from '@/domain/GameBoard';
import ColorCounterBoard from '@/domain/ColorCounterBoard';
import { PanelColor } from '@/domain/panel';
import ColorCounter from '@/domain/ColorCounter';
import { createGameController } from '@/factories/gameControllerFactory';
import { InitializationResult } from '@/types/domain/services/InitializationServiceTypes';

export default class InitializationService {
    initialize(): InitializationResult {
        const gameBoard = new GameBoard(5, 5);

        // eslint-disable-next-line no-unused-vars
        const colorMap: { [key in PanelColor]?: string } = {
            [PanelColor.RED]: 'red',
            [PanelColor.GREEN]: 'green',
            [PanelColor.BLUE]: 'blue',
            [PanelColor.WHITE]: 'white',
        };

        const colorCounters = [
            PanelColor.RED,
            PanelColor.GREEN,
            PanelColor.BLUE,
            PanelColor.WHITE,
        ].map(color => new ColorCounter(color, colorMap[color]!, 0));

        const colorCounterBoard = new ColorCounterBoard(colorCounters);
        const gameController = createGameController(gameBoard, colorCounterBoard);

        return {
            gameBoard,
            colorCounterBoard,
            gameController
        };
    }
}
