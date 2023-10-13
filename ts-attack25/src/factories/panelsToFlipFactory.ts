import { Panel, PanelColor } from "@/domain/panel";
import { container } from "@/containerSetup"; // コンテナのセットアップを参照
import { TYPES } from "@/types";
import { PanelsToFlip } from "@/domain/PanelsToFlip";

export function createPanelsToFlip(gameBoard: Panel[][], selectedPanel: Panel, selectedColor: PanelColor): PanelsToFlip {
    // 必要な変数の値をDIコンテナのコンテキストに設定する前に、既存のバインディングをアンバインド
    if (container.isBound(TYPES.GameBoard)) {
        container.unbind(TYPES.GameBoard);
    }
    container.bind<Panel[][]>(TYPES.GameBoard).toConstantValue(gameBoard);

    if (container.isBound(TYPES.SelectedPanel)) {
        container.unbind(TYPES.SelectedPanel);
    }
    container.bind<Panel>(TYPES.SelectedPanel).toConstantValue(selectedPanel);

    if (container.isBound(TYPES.SelectedColor)) {
        container.unbind(TYPES.SelectedColor);
    }
    container.bind<PanelColor>(TYPES.SelectedColor).toConstantValue(selectedColor);

    // FlippablePanelsのインスタンスを取得
    return container.get<PanelsToFlip>(TYPES.PanelsToFlip);
}
