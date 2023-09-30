// 依存関係の識別子を定義
const TYPES = {
    Directions: Symbol.for("Directions"),
    PanelsToFlip: Symbol.for("PanelsToFlip"),
    GameBoard: Symbol.for("GameBoard"),
    SelectedPanel: Symbol.for("SelectedPanel"),
    SelectedColor: Symbol.for("SelectedColor")
};

export { TYPES };
