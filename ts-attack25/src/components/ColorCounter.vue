<!-- ColorCounter.vue -->
<template>
  <div class="color-counter">
    <div class="color-box" v-for="(color, index) in colors" :key="index" :class="color">
      <div class="number">0</div>
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.color-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: calc((100% - 3 * 20px) / 4);
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
  position: absolute;
  top: 10%;
  left: 0;
  width: 100%;
  height: 80%;
  color: black;
  text-align: center;
  line-height: 80%;
  border: 2px solid black;
  background-color: white;
  font-size: calc(0.8 * ((15vw / 2) * 0.8));
}
</style>
