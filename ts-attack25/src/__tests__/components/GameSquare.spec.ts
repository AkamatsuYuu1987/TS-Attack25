import { mount } from '@vue/test-utils'
import GameSquare from '@/components/GameSquare.vue'
import { PanelColor } from '@/domain/panel';

describe('GameSquare.vue', () => {
    it('renders props.number when passed', () => {
        const number = 10;
        const color = PanelColor.GRAY;
        const wrapper = mount(GameSquare, {
            props: { number, color }
        })
        expect(wrapper.text()).toMatch(number.toString())
    })

    it('renders correct panel color based on props', () => {
        const number = 10;
        const colors = [PanelColor.RED, PanelColor.GREEN, PanelColor.BLUE, PanelColor.WHITE, PanelColor.GRAY];
        const cssColors = ['red', 'green', 'blue', 'white', 'lightgray'];

        colors.forEach((color, i) => {
            const wrapper = mount(GameSquare, {
                props: { number, color }
            })
            const vm = wrapper.vm as any;
            expect(vm.panelColor).toBe(cssColors[i]);
        });
    })
})
