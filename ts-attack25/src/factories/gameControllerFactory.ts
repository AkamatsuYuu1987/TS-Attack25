import GameBoard from "@/domain/GameBoard";
import ColorCounterBoard from "@/domain/ColorCounterBoard";
import GameController from "@/domain/GameController";
import { GameControllerTypes } from "@/types/GameControllerTypes";

import { container } from "@/containerSetup"; // コンテナのセットアップを参照

export function createGameController(gameBoard: GameBoard, colorCounterBoard: ColorCounterBoard): GameController {
    // 必要な変数の値をDIコンテナのコンテキストに設定する前に、既存のバインディングをアンバインド
    if (container.isBound(GameControllerTypes.GameBoard)) {
        container.unbind(GameControllerTypes.GameBoard);
    }
    container.bind<GameBoard>(GameControllerTypes.GameBoard).toConstantValue(gameBoard);

    if (container.isBound(GameControllerTypes.ColorCounterBoard)) {
        container.unbind(GameControllerTypes.ColorCounterBoard);
    }
    container.bind<ColorCounterBoard>(GameControllerTypes.ColorCounterBoard).toConstantValue(colorCounterBoard);

    // GameControllerのインスタンスを取得
    return container.get<GameController>(GameControllerTypes.GameController);
}
