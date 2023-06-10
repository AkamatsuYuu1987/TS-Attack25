export enum PanelColor {
  RED = 1,
  GREEN,
  BLUE,
  WHITE,
  GRAY
}

export class Panel {
    private color: PanelColor;
  private number: number;

  constructor(color: PanelColor = PanelColor.GRAY, number: number) {
      this.color = color;
      this.number = number;
    }

    public setColor(color: PanelColor): void {
      this.color = color;
    }

    public getColor(): PanelColor {
      return this.color;
    }

  public getNumber(): number {
    return this.number;
  }
}
