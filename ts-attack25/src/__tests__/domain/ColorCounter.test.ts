// ColorCounter.test.ts
import ColorCounter from '@/domain/ColorCounter';
import { PanelColor } from '@/domain/panel';

describe('ColorCounter', () => {
    let counter: ColorCounter;

    beforeEach(() => {
        counter = new ColorCounter(PanelColor.RED, 'red'); // Pass PanelColor.RED and 'red' to the constructor
    });

    test('should initialize with count of 0', () => {
        expect(counter.getCount()).toBe(0);
    });

    test('should increment count by 1', () => {
        counter.increment();
        expect(counter.getCount()).toBe(1);
    });

    test('should not decrement below 0', () => {
        counter.decrement();
        expect(counter.getCount()).toBe(0);
    });

    test('should increment and decrement the count correctly', () => {
        counter.increment();
        counter.increment();
        counter.increment();
        counter.decrement();
        expect(counter.getCount()).toBe(2);
    });

    test('should get correct color', () => {
        expect(counter.getColor()).toBe(PanelColor.RED);
    });

    test('should get correct color name', () => { // New test for getColorName method
        expect(counter.getColorName()).toBe('red');
    });
});
