<!-- GameBoard.vue -->
<template>
  <div class="game-board"
       :style="{
           gridTemplateColumns: `repeat(${gameController.gameBoard.getCols()}, 1fr)`,
           gridAutoRows: `${100 / gameController.gameBoard.getRows()}%`
       }"
  >
    <GameSquare v-for="(panel, i) in gameController.gameBoard.getBoard().flat()" :key="`${i}-${panel.color}`"
                :number="i + 1" :panel="panel" @click="onPanelClick(i + 1)"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameSquare from './GameSquare.vue';
import GameController from '../domain/GameController';

export default defineComponent({
  components: {
    GameSquare
  },
  props: {
    gameController: {
      type: Object as () => GameController,
      required: true
    }
  },
  setup(props, { emit }) {
    const displayAlert = (message: string) => {
      window.alert(message);
    };

    const onPanelClick = (panelNumber: number) => {
      // 色が選択されていない場合、処理を終了
      if (props.gameController.selectedColor === null) {
        displayAlert("Please select a color first!");
        return;
      }
      
      // Use the gameController to get the new gameBoard state
      const selectPanelResult = props.gameController.selectPanel(panelNumber);
      const newBoard = selectPanelResult.newGameBoard.getBoard();
      const newColorCounters = selectPanelResult.newColorCounters;

      // Emit the new board and new color counters
      emit('updateBoard', newBoard);
      emit('updateColorCounters', newColorCounters);
    };

    return {
      onPanelClick,
      displayAlert
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
