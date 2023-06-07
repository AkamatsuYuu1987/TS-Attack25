<!-- GameSquare.vue -->
<template>
        <div class="game-square" :style="{ backgroundColor: panelColor }">
            <div class="number-container">
                    <div class="number">{{ number }}</div>
                </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PanelColor } from '../domain/panel';

export default defineComponent({
    props: {
        number: {
            type: Number,
            required: true
        },
        color: {
            type: Number,
            required: true
        }
    },
    computed: {
        panelColor() {
            switch (this.color) {
                case PanelColor.RED:
                    return 'red';
                case PanelColor.GREEN:
                    return 'green';
                case PanelColor.BLUE:
                    return 'blue';
                case PanelColor.WHITE:
                    return 'white';
                case PanelColor.GRAY:
                default:
                    return 'lightgray';
            }
        }
    }
});
</script>

<style scoped>
.game-square {
    width: 100%;
    aspect-ratio: 1 / 1;
    /* Maintain the aspect ratio as 1:1 */
    position: relative;
    border: 1px solid black;
    box-sizing: border-box;
}

.number-container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.number {
    position: relative;
    font-size: 5vw;
}
</style>
