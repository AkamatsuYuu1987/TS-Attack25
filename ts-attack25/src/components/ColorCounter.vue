<!-- ColorCounter.vue -->
<template>
  <div class="color-counter">
    <div class="color-box"
         v-for="colorCounter in colorCounters"
         :key="colorCounter.color"
         :class="colorCounter.colorName"
         @click="$emit('selectColor', colorCounter.color)"
    >
      <span class="number">{{ colorCounter.count }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ColorCounterType from '../domain/ColorCounter';

export default defineComponent({
  props: {
    colorCounters: {
      type: Array as PropType<ColorCounterType[]>,
      required: true
    }
  }
});
</script>

<style scoped>
.color-counter {
  width: 15%;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.color-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7.5vw;
  height: 7.5vw;
  position: relative;
  margin: 0 auto;
  cursor: pointer; /* Add this line */
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}

.white {
  background-color: white;
}

.blue {
  background-color: blue;
}

.number {
  color: white;
  text-align: center;
  font-size: calc(0.8 * ((15vw / 2) * 0.8));
  -webkit-text-stroke: 1px black; /* apply black outline */
}
</style>
