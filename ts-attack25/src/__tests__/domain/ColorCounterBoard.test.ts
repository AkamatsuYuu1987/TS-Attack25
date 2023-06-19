import { Panel, PanelColor } from '@/domain/panel';
import ColorCounter from '@/domain/ColorCounter';
import ColorCounterBoard from '@/domain/ColorCounterBoard';

describe('ColorCounterBoard', () => {
    let colorCounterBoard: ColorCounterBoard;
    let counters: ColorCounter[];
    let panels: Panel[];

    beforeEach(() => {
        counters = [
            new ColorCounter(PanelColor.RED, "Red", 0),
            new ColorCounter(PanelColor.GREEN, "Green", 0),
            new ColorCounter(PanelColor.BLUE, "Blue", 0),
        ];
        colorCounterBoard = new ColorCounterBoard(counters);
        panels = [
            new Panel(PanelColor.RED, 1, 1, 1),
            new Panel(PanelColor.GREEN, 2, 2, 2),
            new Panel(PanelColor.RED, 3, 3, 3),
            new Panel(PanelColor.BLUE, 4, 4, 4),
            new Panel(PanelColor.GREEN, 5, 5, 5),
        ];
    });

    it('should set and get counters correctly', () => {
        const newCounters = [
            new ColorCounter(PanelColor.RED, "Red", 2),
            new ColorCounter(PanelColor.GREEN, "Green", 1),
            new ColorCounter(PanelColor.BLUE, "Blue", 3),
        ];
        colorCounterBoard.setCounters(newCounters);
        expect(colorCounterBoard.getCounters()).toEqual(newCounters);
    });

    it('should update counters correctly', () => {
        colorCounterBoard.updateColorCounters(panels);
        expect(colorCounterBoard.getCounters()[0].getCount()).toEqual(2); // 2 Red panels
        expect(colorCounterBoard.getCounters()[1].getCount()).toEqual(2); // 2 Green panels
        expect(colorCounterBoard.getCounters()[2].getCount()).toEqual(1); // 1 Blue panel

    });
});
