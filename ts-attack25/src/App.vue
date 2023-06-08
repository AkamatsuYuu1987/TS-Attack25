<!-- App.vue -->
<template>
  <div id="app">
    <div class="game-container" v-if="gameController">
      <GameBoard :rows="5" :cols="5" :board="gameController.gameBoard.getBoard()" @selectPanel="selectPanel" />
      <ColorCounter :colorCounters="gameController.colorCounters" @selectColor="selectColor" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import GameBoardComponent from './components/GameBoard.vue';
import ColorCounterComponent from './components/ColorCounter.vue';
import GameController from './domain/GameController';
import GameBoard from './domain/GameBoard';
import { PanelColor } from './domain/panel';
import ColorCounter from './domain/ColorCounter';

export default defineComponent({
  components: {
    GameBoard: GameBoardComponent,
    ColorCounter: ColorCounterComponent
  },
  setup() {
    const gameBoard = new GameBoard(5, 5);

    // eslint-disable-next-line no-unused-vars
    const colorMap: { [key in PanelColor]?: string } = {
      [PanelColor.RED]: 'red',
      [PanelColor.GREEN]: 'green',
      [PanelColor.BLUE]: 'blue',
      [PanelColor.WHITE]: 'white',
    };
    
    const colorCounters = [
      PanelColor.RED,
      PanelColor.GREEN,
      PanelColor.BLUE,
      PanelColor.WHITE,
    ].map(color => new ColorCounter(color, colorMap[color]!)); // <-- Add non-null assertion operator here

    const gameController = ref(new GameController(gameBoard, colorCounters));

    const selectColor = (color: string) => {
      console.log(`Color selected: ${color}`);
      if (Object.values(PanelColor).includes(Number(color))) {
        gameController.value?.selectColor(Number(color));
      }
    };

    const selectPanel = (panelNumber: number) => {
      gameController.value?.selectPanel(panelNumber);
    };

    return {
      gameController,
      selectColor,
      selectPanel
    };
  }
});
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
