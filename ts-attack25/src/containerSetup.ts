/** containerSetup.ts */
import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { GameControllerTypes } from "@/types/GameControllerTypes";
import { Directions } from "@/domain/Directions";
import { PanelsToFlip } from "@/domain/PanelsToFlip";
import { Panel, PanelColor } from "@/domain/panel";
import SelectPanelExecutor from "@/domain/SelectPanelExecutor";
import GameController from "@/domain/GameController";
import GameBoard from "@/domain/GameBoard";
import ColorCounterBoard from "@/domain/ColorCounterBoard";

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

// GameControllerの依存関係のバインディング
container.bind<SelectPanelExecutor>(GameControllerTypes.SelectPanelExecutor).to(SelectPanelExecutor);
container.bind<GameController>(GameControllerTypes.GameController).toDynamicValue(context => {
    const gameBoard = context.container.get<GameBoard>(GameControllerTypes.GameBoard);
    const colorCounterBoard = context.container.get<ColorCounterBoard>(GameControllerTypes.ColorCounterBoard);
    const selectPanelExecutor = context.container.get<SelectPanelExecutor>(GameControllerTypes.SelectPanelExecutor);
    return new GameController(gameBoard, colorCounterBoard, selectPanelExecutor);
})

export { container };
