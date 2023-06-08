export enum PanelColor {
  RED = 1,
  GREEN,
  BLUE,
  WHITE,
  GRAY
}

export class Panel {
    private color: PanelColor;

    constructor(color: PanelColor = PanelColor.GRAY) {
      this.color = color;
    }

    public setColor(color: PanelColor): void {
      this.color = color;
    }

    public getColor(): PanelColor {
      return this.color;
    }
}
