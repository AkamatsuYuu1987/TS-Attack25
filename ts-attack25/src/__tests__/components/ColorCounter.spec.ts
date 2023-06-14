// ColorCounter.spec.ts
import { shallowMount } from '@vue/test-utils';
import ColorCounter from '@/components/ColorCounter.vue';
import ColorCounterType from '@/domain/ColorCounter';
import { PanelColor } from '@/domain/panel';

describe('ColorCounter.vue', () => {
    it('renders correct number of color boxes', () => {
        const colorMap: { [key in PanelColor]?: string } = {
            [PanelColor.RED]: 'red',
            [PanelColor.GREEN]: 'green',
            [PanelColor.BLUE]: 'blue',
            [PanelColor.WHITE]: 'white',
        };
        const colorCounters = [
            new ColorCounterType(PanelColor.RED, 'red', 0),
            new ColorCounterType(PanelColor.GREEN, 'green', 0),
            new ColorCounterType(PanelColor.BLUE, 'blue', 0),
            new ColorCounterType(PanelColor.WHITE, 'white', 0),
        ];
        const wrapper = shallowMount(ColorCounter, {
            props: { colorCounters },
        });

        expect(wrapper.findAll('.color-box').length).toBe(colorCounters.length);
    });

    it('emits selectColor event with correct data when color box clicked', async () => {
        const colorMap: { [key in PanelColor]?: string } = {
            [PanelColor.RED]: 'red',
            [PanelColor.GREEN]: 'green',
            [PanelColor.BLUE]: 'blue',
            [PanelColor.WHITE]: 'white',
        };
        const colorCounters = [
            new ColorCounterType(PanelColor.RED, 'red', 0),
            new ColorCounterType(PanelColor.GREEN, 'green', 0),
            new ColorCounterType(PanelColor.BLUE, 'blue', 0),
            new ColorCounterType(PanelColor.WHITE, 'white', 0),
        ];
        const wrapper = shallowMount(ColorCounter, {
            props: { colorCounters },
        });

        await wrapper.find('.color-box').trigger('click');

        expect(wrapper.emitted().selectColor).toBeTruthy();
        expect(wrapper.emitted().selectColor[0]).toEqual([PanelColor.RED]);
    });
});
