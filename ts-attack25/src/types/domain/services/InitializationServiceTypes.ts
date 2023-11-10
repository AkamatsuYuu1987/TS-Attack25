import GameBoard from '@/domain/GameBoard';
import ColorCounterBoard from '@/domain/ColorCounterBoard';
import GameController from '@/domain/GameController';

export type InitializationResult = {
    gameBoard: GameBoard | null;
    colorCounterBoard: ColorCounterBoard | null;
    gameController: GameController | null;
};
