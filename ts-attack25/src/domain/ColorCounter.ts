// ColorCounter.ts
import { PanelColor } from './panel';

class ColorCounter {
  private color: PanelColor;
  private colorName: string;  // 追加されたプロパティ
  private count: number;

  constructor(color: PanelColor, colorName: string) {  // 更新されたコンストラクタ
    this.color = color;
    this.colorName = colorName;  // 新しいプロパティの値を設定
    this.count = 0;
  }

  getColor(): PanelColor {
    return this.color;
  }

  getColorName(): string {  // 新たなメソッド
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
}

export default ColorCounter;
