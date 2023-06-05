<!-- GameBoard.vue -->
<template>
    <div class="game-board">
        <GameSquare v-for="i in 25" :key="i" />
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
    grid-template-rows: repeat(5, 1fr);
    gap: 0;
}
</style>
