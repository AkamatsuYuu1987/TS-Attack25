<template>
  <div id="app">
    <div class="game-container">
      <GameBoard />
      <ColorCounter />
    </div>
  </div>
</template>

<script>
import GameBoard from './components/GameBoard.vue';
import ColorCounter from './components/ColorCounter.vue';

export default {
  components: {
    GameBoard,
    ColorCounter
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.game-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  --game-board-height: 80vh;
  height: var(--game-board-height);
}

</style>
