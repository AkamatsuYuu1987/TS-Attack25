// GameBoard.spec.ts
import { mount } from '@vue/test-utils'
import GameBoard from '@/components/GameBoard.vue'
import GameSquare from '@/components/GameSquare.vue'
import { Panel, PanelColor } from '@/domain/panel';

describe('GameBoard.vue', () => {
    it('renders the game board with default 5x5 grid', () => {
        const wrapper = mount(GameBoard);
        expect(wrapper.findAllComponents(GameSquare)).toHaveLength(5 * 5);
    });

    it('renders the game board with the correct number of panels based on rows and cols props', () => {
        const rows = 3;
        const cols = 4;
        const wrapper = mount(GameBoard, {
            props: { rows, cols }
        });
        expect(wrapper.findAllComponents(GameSquare)).toHaveLength(rows * cols);
    });

    it('passes the correct props to the GameSquare components', () => {
        const rows = 3;
        const cols = 3;
        const wrapper = mount(GameBoard, {
            props: { rows, cols }
        });

        const gameSquares = wrapper.findAllComponents(GameSquare);
        gameSquares.forEach((gameSquare, i) => {
            expect(gameSquare.props('number')).toBe(i + 1);
            expect(gameSquare.props('panel')).toBeInstanceOf(Panel);
        });
    });
});
