import { Panel, PanelColor } from '@/domain/panel';

describe('Panel', () => {
    let panel: Panel;

    beforeEach(() => {
        panel = new Panel(PanelColor.GRAY);
    });

    it('should set the initial color correctly', () => {
        expect(panel.getColor()).toBe(PanelColor.GRAY);
    });

    it('should set the default color to GRAY when no color is specified', () => {
        const defaultPanel = new Panel();
        expect(defaultPanel.getColor()).toBe(PanelColor.GRAY);
    });

    it('should change the color correctly', () => {
        panel.setColor(PanelColor.RED);
        expect(panel.getColor()).toBe(PanelColor.RED);
    });
});