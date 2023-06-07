import { mount } from '@vue/test-utils'
import GameSquare from '@/components/GameSquare.vue'
import { Panel, PanelColor } from '@/domain/panel';

describe('GameSquare.vue', () => {
    it('renders props.number when passed', () => {
        const number = 10;
        const wrapper = mount(GameSquare, {
            props: { number }
        })
        expect(wrapper.text()).toMatch(number.toString())
    })

    it('renders correct panel color when panel color is changed', async () => {
        const number = 10;
        const wrapper = mount(GameSquare, {
            props: { number }
        })
        const vm = wrapper.vm as any;
        vm.panel.setColor(PanelColor.RED);
        await wrapper.vm.$nextTick();
        expect(vm.panelColor).toBe('red');

        vm.panel.setColor(PanelColor.GREEN);
        await wrapper.vm.$nextTick();
        expect(vm.panelColor).toBe('green');

        vm.panel.setColor(PanelColor.BLUE);
        await wrapper.vm.$nextTick();
        expect(vm.panelColor).toBe('blue');

        vm.panel.setColor(PanelColor.WHITE);
        await wrapper.vm.$nextTick();
        expect(vm.panelColor).toBe('white');

        vm.panel.setColor(PanelColor.GRAY);
        await wrapper.vm.$nextTick();
        expect(vm.panelColor).toBe('lightgray');
    })
})
