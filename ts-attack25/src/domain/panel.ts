export enum PanelColor {
    RED,
    GREEN,
    BLUE,
    WHITE,
    GRAY
  }
  
  export class Panel {
    private color: PanelColor;
  
    constructor(color: PanelColor) {
      this.color = color;
    }
  
    public setColor(color: PanelColor): void {
      this.color = color;
    }
  
    public getColor(): PanelColor {
      return this.color;
    }
  }
  