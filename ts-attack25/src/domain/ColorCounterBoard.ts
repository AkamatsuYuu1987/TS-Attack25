import ColorCounter from './ColorCounter';
import { Panel } from './panel';

class ColorCounterBoard {
    private counters: ColorCounter[];

    constructor(counters: ColorCounter[]) {
        this.counters = counters;
    }

    public getCounters(): ColorCounter[] {
        return this.counters;
    }

    public setCounters(newCounters: ColorCounter[]): void {
        this.counters = newCounters;
    }

    updateColorCounters(panels: Panel[]): void {
        this.counters.forEach(counter => {
            // Count the panels of each color
            const panelCount = panels.filter(panel => panel.getColor() === counter.getColor()).length;
            counter.setCount(panelCount);
        });
    }

    changeColorCounters(panels: Panel[]): void {
        this.counters.forEach(counter => {
            // Count the panels of each color
            const panelCount = panels.filter(panel => panel.getColor() === counter.getColor()).length;
            counter.setCount(panelCount);
        });
    }
}

export default ColorCounterBoard;