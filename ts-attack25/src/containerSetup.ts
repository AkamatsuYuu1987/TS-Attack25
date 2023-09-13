import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { Directions } from "@/domain/Directions";
import { PanelsToFlip } from "@/domain/PanelsToFlip";
import { Panel, PanelColor } from "@/domain/panel";

// コンテナのセットアップ
const container = new Container();
container.bind<Directions>(TYPES.Directions).to(Directions);
container.bind<PanelsToFlip>(TYPES.PanelsToFlip).toDynamicValue(context => {
    const directions = context.container.get<Directions>(TYPES.Directions);
    const gameBoard = context.container.get<Panel[][]>(TYPES.GameBoard);
    const selectedPanel = context.container.get<Panel>(TYPES.SelectedPanel);
    const selectedColor = context.container.get<PanelColor>(TYPES.SelectedColor);
    return new PanelsToFlip(directions, gameBoard, selectedPanel, selectedColor);
});

export { container };
