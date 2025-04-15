<script setup lang="ts">
/* import CardDrop from './CardDrop.vue'
import CardDrag from './CardDrag.vue' */
import ItemDrag from './ItemDragger.vue'


</script>

<template>
     <!--  <CardDrop  elementRefName="uno"/>
      <CardDrop  elementRefName="dos"/> -->
      <ItemDrag />
    <!-- <div class="right">
      <CardDrag />
    </div> -->
    
  <div class="grid-container">
    <!-- <div v-for="i in 16" :key="i" class="grid-item">
      <CardDrop />
    </div> -->
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 150px);
  width: 500px;
}

.grid-item {
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  border-radius: 5px;
  margin: 5px;
}
</style>
