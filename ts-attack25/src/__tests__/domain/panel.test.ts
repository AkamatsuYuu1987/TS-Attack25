import { Panel, PanelColor } from '@/domain/panel';

describe('Panel', () => {
    let panel: Panel;
    const initialPanelNumber = 1;
    const initialRow = 0;
    const initialColumn = 0;

    beforeEach(() => {
        panel = new Panel(PanelColor.GRAY, initialPanelNumber, initialRow, initialColumn);
    });

    it('should set the initial color, number, row and column correctly', () => {
        expect(panel.getColor()).toBe(PanelColor.GRAY);
        expect(panel.getNumber()).toBe(initialPanelNumber);
        expect(panel.getRow()).toBe(initialRow);
        expect(panel.getColumn()).toBe(initialColumn);
    });

    it('should set the default color to GRAY when no color is specified', () => {
        const defaultPanelNumber = 2;
        const defaultRow = 1;
        const defaultColumn = 1;
        const defaultPanel = new Panel(undefined, defaultPanelNumber, defaultRow, defaultColumn);
        expect(defaultPanel.getColor()).toBe(PanelColor.GRAY);
        expect(defaultPanel.getNumber()).toBe(defaultPanelNumber);
        expect(defaultPanel.getRow()).toBe(defaultRow);
        expect(defaultPanel.getColumn()).toBe(defaultColumn);
    });

    it('should change the color correctly', () => {
        panel.setColor(PanelColor.RED);
        expect(panel.getColor()).toBe(PanelColor.RED);
        panel.setColor(PanelColor.GREEN);
        expect(panel.getColor()).toBe(PanelColor.GREEN);
        panel.setColor(PanelColor.BLUE);
        expect(panel.getColor()).toBe(PanelColor.BLUE);
        panel.setColor(PanelColor.WHITE);
        expect(panel.getColor()).toBe(PanelColor.WHITE);
        panel.setColor(PanelColor.GRAY);
        expect(panel.getColor()).toBe(PanelColor.GRAY);
    });
});
