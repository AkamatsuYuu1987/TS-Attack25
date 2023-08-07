// ColorCounter.spec.ts
import { shallowMount } from '@vue/test-utils';
import ColorCounter from '@/components/ColorCounter.vue';
import ColorCounterType from '@/domain/ColorCounter';
import { PanelColor } from '@/domain/panel';
import ColorCounterBoard from '@/domain/ColorCounterBoard';

describe('ColorCounter.vue', () => {
    it('renders correct number of color boxes', () => {
        const colorCounters = [
            new ColorCounterType(PanelColor.RED, 'red', 5),
            new ColorCounterType(PanelColor.GREEN, 'green', 4),
            new ColorCounterType(PanelColor.BLUE, 'blue', 3),
            new ColorCounterType(PanelColor.WHITE, 'white', 2),
        ];
        // colorCounterBoardをコンストラクタから生成
        const colorCounterBoard = new ColorCounterBoard(colorCounters);
        const wrapper = shallowMount(ColorCounter, {
            props: { colorCounterBoard },
        });

        expect(wrapper.findAll('.color-box').length).toBe(colorCounters.length);
    });

    it('emits selectColor event with correct data when color box clicked', async () => {
        const colorCounters = [
            new ColorCounterType(PanelColor.RED, 'red', 5),
            new ColorCounterType(PanelColor.GREEN, 'green', 4),
            new ColorCounterType(PanelColor.BLUE, 'blue', 3),
            new ColorCounterType(PanelColor.WHITE, 'white', 2),
        ];
        // colorCounterBoardをコンストラクタから生成
        const colorCounterBoard = new ColorCounterBoard(colorCounters);
        const wrapper = shallowMount(ColorCounter, {
            props: { colorCounterBoard },
        });

        await wrapper.find('.color-box').trigger('click');

        expect(wrapper.emitted().selectColor).toBeTruthy();
        expect(wrapper.emitted().selectColor[0]).toEqual([PanelColor.RED]);
    });
});
