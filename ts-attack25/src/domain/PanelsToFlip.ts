import { Panel, PanelColor } from "@/domain/panel"

import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "@/types";
import { Directions } from "@/domain/Directions";

@injectable()
export class PanelsToFlip {
    private panels: Panel[];

    constructor(
        @inject(TYPES.Directions) private directions: Directions,
        @inject(TYPES.GameBoard) gameBoard: Panel[][],
        @inject(TYPES.SelectedPanel) selectedPanel: Panel,
        @inject(TYPES.SelectedColor) selectedColor: PanelColor
    ) {
        this.panels = this.directions.findPanelsToFlipInAllDirections(gameBoard, selectedPanel, selectedColor);
    }

    getPanels(): Panel[] {
        return this.panels;
    }
}