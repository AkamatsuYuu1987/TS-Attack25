<!-- GameSquare.vue -->
<template>
    <div class="game-square">
        <div class="number-container">
            <div class="number">{{ number }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        number: {
            type: Number,
            required: true,
        },
    },
};
</script>


<style scoped>
.game-square {
    width: 100%;
    padding-bottom: 100%;
    position: relative;  
    border: 1px solid black;
    background-color: #D3D3D3;
    box-sizing: border-box;
}

.number-container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.number {
    position: relative;
    font-size: 5vw;
}
</style>
