<!-- GameBoard.vue -->
<template>
  <div class="game-board" :style="{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridAutoRows: `${100 / rows}%` }">
    <GameSquare v-for="(item, i) in Array(rows * cols)" :key="i" :number="i + 1" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameSquare from './GameSquare.vue';

export default defineComponent({
  components: {
    GameSquare
  },
  props: {
    rows: {
      type: Number,
      default: 5
    },
    cols: {
      type: Number,
      default: 5
    }
  }
});
</script>

<style scoped>
.game-board {
  display: grid;
  gap: 0;
  height: 100%;
}
</style>
