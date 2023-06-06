<!-- ColorCounter.vue -->
<template>
  <div class="color-counter">
    <div class="color-box" v-for="(color, index) in colors" :key="index" :class="color">
      <span class="number">0</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: ['red', 'green', 'white', 'blue']
    };
  },
};
</script>

<style scoped>
.color-counter {
  width: 15%;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.color-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 50%;  /* Add this */
  position: relative;
  margin: 0 auto;
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}

.white {
  background-color: white;
}

.blue {
  background-color: blue;
}

.number {
  color: white;
  text-align: center;
  font-size: calc(0.8 * ((15vw / 2) * 0.8));
  -webkit-text-stroke: 1px black; /* apply black outline */
}
</style>
