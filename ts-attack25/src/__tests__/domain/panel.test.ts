import { Panel, PanelColor } from '@/domain/panel';

describe('Panel', () => {
    let panel: Panel;
    const initialPanelNumber = 1;

    beforeEach(() => {
        panel = new Panel(PanelColor.GRAY, initialPanelNumber);
    });

    it('should set the initial color and number correctly', () => {
        expect(panel.getColor()).toBe(PanelColor.GRAY);
        expect(panel.getNumber()).toBe(initialPanelNumber);
    });

    it('should set the default color to GRAY when no color is specified', () => {
        const defaultPanelNumber = 2;
        const defaultPanel = new Panel(undefined, defaultPanelNumber);
        expect(defaultPanel.getColor()).toBe(PanelColor.GRAY);
        expect(defaultPanel.getNumber()).toBe(defaultPanelNumber);
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
