<!-- GameBoard.vue -->
<template>
  <div class="game-board" :style="{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridAutoRows: `${100 / rows}%` }">
    <GameSquare v-for="(panel, i) in gameBoard.getBoard().flat()" :key="i" :number="i + 1" :panel="panel" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import GameSquare from './GameSquare.vue';
import GameBoard from '../domain/GameBoard';

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
  },
  setup(props) {
    const gameBoard = ref(new GameBoard(props.rows, props.cols));

    return {
      gameBoard
    };
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
