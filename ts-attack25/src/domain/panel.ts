// panel.ts
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
  private row: number;
  private col: number;

  constructor(color: PanelColor = PanelColor.GRAY, number: number, row: number, col: number) {
    this.color = color;
    this.number = number;
    this.row = row;
    this.col = col;
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

  public getRow(): number {
    return this.row;
  }

  public getColumn(): number {
    return this.col;
  }
}
