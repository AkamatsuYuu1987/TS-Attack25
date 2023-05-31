<template>
  <div>
    <div class="grid">
      <div
        v-for="panel in game.panels"
        :key="panel.id"
        :style="{ backgroundColor: panel.color }"
      >
        {{ panel.id }}
      </div>
    </div>
    <button @click="selectPanel(player, panelId)">Select Panel</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import Game from '../classes/Game';

export default {
  setup() {
    const game = reactive(new Game());
    const panelId = ref(0);
    const player = ref(game.players[0]);

    const selectPanel = (player, panelId) => {
      game.selectPanel(player, panelId);
    };

    return {
      game,
      panelId,
      player,
      selectPanel
    };
  },
};
</script>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
}
</style>
