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
  width: 85vw;  // 新規追加: アプリケーションの幅を指定
}

.game-container {
    display: flex;
    justify-content: space-between;
    align-items: stretch;  /* change from flex-start to stretch */
    flex-wrap: wrap;
    --game-board-height: 50vh;  /* Add this */
    height: var(--game-board-height);  /* Add this */
}
</style>
