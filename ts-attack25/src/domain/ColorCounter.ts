// ColorCounter.ts
import { PanelColor } from './panel';

class ColorCounter {
  private color: PanelColor;
  private colorName: string;
  private count: number;

  constructor(color: PanelColor, colorName: string, count: number) {
    this.color = color;
    this.colorName = colorName;
    this.count = count;
  }

  getColor(): PanelColor {
    return this.color;
  }

  getColorName(): string {
    return this.colorName;
  }

  increment(): void {
    this.count++;
  }

  decrement(): void {
    if(this.count > 0) {
      this.count--;
    }
  }

  getCount(): number {
    return this.count;
  }

  setCount(count: number): void {
    this.count = count;
  }
}

export default ColorCounter;
