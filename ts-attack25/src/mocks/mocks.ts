// mocks.ts
import GameBoard from '@/domain/GameBoard';
import { Panel } from '@/domain/panel';
import ColorCounterBoard from '@/domain/ColorCounterBoard';
import ColorCounter from '@/domain/ColorCounter';

export class MockGameBoard extends GameBoard {
    constructor(board: Panel[][]) {
        super(board.length, board[0].length);
        this.board = board;
    }
}

export class MockColorCounterBoard extends ColorCounterBoard {
    constructor(counters: ColorCounter[]) {
        super(counters);
        this.counters = counters;
    }
}
