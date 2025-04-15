<script lang="ts" setup>
/* import type { ICard } from '@/models'; */
import { useDraggable } from '@vueuse/core'
import { useTemplateRef } from 'vue'
/* defineProps<{ card: ICard }>() */


const el = useTemplateRef<HTMLElement>('el')

const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
})
const img = new URL('../assets/cartas/1 el gallo.jpg', import.meta.url).href;


function onDragStart(event: DragEvent) {
  console.log("start draggin");
  event.dataTransfer?.setData("text/plain", img);
  event.dataTransfer?.setData("custom-image", img); // Custom type
}
</script>

<template>
    <div  draggable="true"  @dragstart="onDragStart" ref="el" :style="style" style="position: fixed">
        <img :src="img" alt="" width="150" height="250" class="responsive-img"/>
    </div>
</template>
<style scoped>
.responsive-img {
  height: auto; /* Ajusta la altura según necesites */
  object-fit: cover; /* Corta la imagen para llenar el espacio sin deformarse */
  display: block;
  margin: 0 auto;
}
</style>

