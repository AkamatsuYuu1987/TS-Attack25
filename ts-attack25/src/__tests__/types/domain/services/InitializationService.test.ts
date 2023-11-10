import InitializationService from '@/domain/services/InitializationService';
import GameBoard from '@/domain/GameBoard';
import ColorCounterBoard from '@/domain/ColorCounterBoard';
import ColorCounter from '@/domain/ColorCounter';
import { PanelColor } from '@/domain/panel';
import GameController from '@/domain/GameController';

describe('InitializationService', () => {
    let service: InitializationService;

    beforeEach(() => {
        service = new InitializationService();
    });

    it('should initialize correctly', () => {
        const result = service.initialize();

        // Verify gameBoard instance and dimensions
        expect(result.gameBoard).toBeInstanceOf(GameBoard);
        expect(result.gameBoard!.getRows()).toBe(5);
        expect(result.gameBoard!.getCols()).toBe(5);

        // Verify colorCounterBoard instance and counters
        expect(result.colorCounterBoard).toBeInstanceOf(ColorCounterBoard);
        const colors = [PanelColor.RED, PanelColor.GREEN, PanelColor.BLUE, PanelColor.WHITE];
        colors.forEach((color, index) => {
            const counter = result.colorCounterBoard!.getCounters()[index] as ColorCounter;
            expect(counter.getColor()).toBe(color);
            expect(counter.getCount()).toBe(0);
        });

        // Verify gameController instance (assuming it's an object, further tests depend on its structure)
        expect(result.gameController).toBeInstanceOf(GameController);

    });
});
