import { Panel, PanelColor } from './panel';
import { injectable } from "inversify";
import 'reflect-metadata';

@injectable()
export default class SelectPanelExecutor {

    constructor() {
    }

    public flipPanels(panels: Panel[], selectedColor: PanelColor | null) {
        if (selectedColor === null) {
            throw new Error('No color has been selected');
        }

        for (const panel of panels) {
            panel.setColor(selectedColor);
        }
    }


}
