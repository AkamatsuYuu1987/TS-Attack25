<!-- GameBoard.vue -->
<template>
  <div class="game-board">
    <GameSquare v-for="i in 25" :key="i" :number="i" />
  </div>
</template>

<script>
import GameSquare from './GameSquare.vue';

export default {
  components: {
    GameSquare
  }
};
</script>

<style scoped>
.game-board {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 20%; /* This ensures each row takes up exactly 20% of the board's height */
  gap: 0;
  height: 100%; /* Match the height with game-container */
}
</style>
