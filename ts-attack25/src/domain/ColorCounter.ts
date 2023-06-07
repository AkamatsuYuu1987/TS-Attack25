class ColorCounter {
    private count: number;
  
    constructor() {
      this.count = 0;
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