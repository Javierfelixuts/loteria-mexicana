
<script lang="ts" setup>
import { ref } from "vue";
import draggable from "vuedraggable";
import { useVueToPrint } from "vue-to-print";
const componentToPrint = ref();
const showCardsAvailable = ref(false);
const logo = new URL("../assets/logo/JARTEC.jpg", import.meta.url).href
// Definir interfaz para una carta
interface Card {
  id: number;
  img: string;
}

const editing = ref(true);

// Lista de cartas disponibles (NO se deben perder)
const meals = ref<Card[]>([
  { id: 1, img: new URL("../assets/cartas/small/1 el gallo.jpg", import.meta.url).href },
  { id: 2, img: new URL("../assets/cartas/small/2 el diablito.jpg", import.meta.url).href },
  { id: 3, img: new URL("../assets/cartas/small/3 la dama.jpg", import.meta.url).href },
  { id: 4, img: new URL("../assets/cartas/small/4 el catrin.jpg", import.meta.url).href },
  { id: 5, img: new URL("../assets/cartas/small/5 el paraguas.jpg", import.meta.url).href },
  { id: 6, img: new URL("../assets/cartas/small/6 la sirena.jpg", import.meta.url).href },
  { id: 7, img: new URL("../assets/cartas/small/7 la escalera.jpg", import.meta.url).href },
  { id: 8, img: new URL("../assets/cartas/small/8 la botella.jpg", import.meta.url).href },
  { id: 9, img: new URL("../assets/cartas/small/9 barril.jpg", import.meta.url).href },
  { id: 10, img: new URL("../assets/cartas/small/10 arbol.jpg", import.meta.url).href },
  { id: 11, img: new URL("../assets/cartas/small/11 melon.jpg", import.meta.url).href },
  { id: 12, img: new URL("../assets/cartas/small/12 el valiente.jpg", import.meta.url).href },
  { id: 13, img: new URL("../assets/cartas/small/13 el gorrito.jpg", import.meta.url).href },
  { id: 14, img: new URL("../assets/cartas/small/14 la muerte.jpg", import.meta.url).href },
  { id: 15, img: new URL("../assets/cartas/small/15 la pera.jpg", import.meta.url).href },
  { id: 16, img: new URL("../assets/cartas/small/16 la bandera.jpg", import.meta.url).href },
  { id: 16, img: new URL("../assets/cartas/small/17 el bandolon.jpg", import.meta.url).href },
  { id: 16, img: new URL("../assets/cartas/small/18 el violoncello.jpg", import.meta.url).href },
  { id: 16, img: new URL("../assets/cartas/small/19 la garza.jpg", import.meta.url).href },
  { id: 16, img: new URL("../assets/cartas/small/20 el pajaro.jpg", import.meta.url).href },
  { id: 16, img: new URL("../assets/cartas/small/21 la mano.jpg", import.meta.url).href },
]);

//#region print

  const {handlePrint} = useVueToPrint({
    content: componentToPrint,
    documentTitle: "loteria-mexicana",
    //removeAfterPrint: true,
  });
  

// Cartas en la zona de drop
const droppedMeals = ref<Card[]>([]);

const hashMapIds = ref({});
const hashMap: any = ref({});
const getRandInt = () => {
  console.log("hashMap: ", hashMap);
  if(hashMap.value.length >= 16){
    return hashMap.value
  }
  for(let i = 0; i <= 16; i++){
    const j = Math.floor(Math.random() * (i + 1));
    if(j == hashMap.value[j]){
      return;
    }
    hashMap.value[j] = j;
  }
  //return Math.floor(Math.random() * (index + 1));
}
const dragEnd = (e: any, droppedMeals: any) => {
  const imgID = Number(e.target.childNodes[0].id);
  //hashMapIds.value = {...hashMapIds.value, [imgID]:imgID}
  
  console.log("hashMap: ", hashMapIds.value);
  console.log("droppedMeals: ", droppedMeals);
  //droppedMeals.push(droppedMeals)
  console.log("imgID: ", imgID)
 
}

function generateUniqueRandoms(count=16, min = 0, max = 15) {
  const used = new Set();
  const result = [];
  droppedMeals.value = [];
  while (result.length < count) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!used.has(random)) {
      used.add(random);
      droppedMeals.value.push(meals.value[random]);
      result.push(random);
      console.log('Nuevo número aleatorio:', random);
    } /* else {
      console.log('Repetido, generando otro:', random);
    } */
  }

  return result;
}

const shuffleCards = () => {
  generateUniqueRandoms();
  //meals.value = [];
  //getRandInt();
  //const random = Math.random() * 1;
  //console.log("random: ", random);
  //console.log("meals: ", meals.value)
  /* meals.value.map((item: any, index: number) => {
    if(droppedMeals.value.length < 16){ */
      /* let j = getRandInt(index);
      if(j == hashMap[j]){

      }
      hashMap[j] = j
      console.log("j; ", j)
      console.log("hashMap; ", hashMap) */
    /*   droppedMeals.value.push(item)
    }
  }); */

 /*  for (let i = 16; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    console.log("j: ", j);
    [ droppedMeals.value[i],  droppedMeals.value[j]] = [ meals.value[j],  meals.value[i]];
  } */
  console.log(droppedMeals.value);
} 

// Función para clonar una carta en la zona de drop
const cloneCard = (meal: Card): Card | null => {
    return { ...meal, id: meal.id }; // Crear un nuevo objeto para evitar referencias
};

const showAvailableCards = () => {
  showCardsAvailable.value = true
}
const closeAvailableCards = () => {
  showCardsAvailable.value = false;
}

// Eliminar una carta de la zona de drop
const removeCard = (index: number) => {
  droppedMeals.value.splice(index, 1);
};

// Función para imprimir solo la zona de drop
const printGrid = () => {
  let printContent = document.getElementById("printable-grid");
  let img:any = document.createElement('img');
  img.src = '../assets/cartas/small/1 el gallo.jpg';
  printContent?.parentNode?.appendChild(img);
  const elements = document.querySelectorAll('.removeCard')
  console.log("elementos: ", elements);
  elements.forEach(element => {
    element.remove();
  });
  if (printContent) {
    const newWindow = window.open("", "", "width=800,height=600");
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title></title>
            <style>
              body { text-align: center; font-family: Arial, sans-serif; }
              #printable-grid { display: grid; grid-template-columns: repeat(4, 150px); width: 900px; }
              #printable-grid img {  border-top: 2px  solid black !important; border-right: 1px solid black !important; border-bottom: 1px solid black !important;
              border-left: 2px solid black !important;
              box-shadow: none !important; width: 140px; height: auto; margin-bottom: 8px; }
              img { width: 150px}
              @media print { body * { visibility: hidden; } #custom-text, #title, #logo, #logo2 { visibility: visible; } #printable-grid, #printable-grid * { visibility: visible; } }
            </style>
          </head>
          <body>
          <div>
            <!-- <img id="logo" src="/logo/JARTEC.jpg" style="margin-bottom: 2px;" alt="jartec" width="100" height="50"/> -->
            ${printContent.outerHTML}
            </div>
            <script>
              setTimeout(() => { window.print(); window.close(); }, 500);
            <\/script>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  }
};
</script>

<template>
  <h2 class="text-xl font-bold">Arrastra las cartas</h2>
  <button @click="shuffleCards" class="p-2 bg-blue-200 text-white rounded-md mb-4" style="background-color: chocolate;">Revolver</button>
  <button @click="handlePrint" class="p-2 bg-blue-200 text-white rounded-md mb-4" style="background-color: rebeccapurple;">Imprimir Grid</button>
  <button @click="showAvailableCards" class="p-2 bg-blue-200 text-white rounded-md mb-4" style="background-color: green;">Mostrar cartas</button>


  <!-- Lista de cartas disponibles -->
  <div class="sidebar" :show="showCardsAvailable" :class="showCardsAvailable ? 'open': 'close'">
    <h4>Cartas disponibles</h4> <button @click=closeAvailableCards>close</button>
    <draggable v-model="meals"  item-key="id" tag="div" :group="{ name: 'cartas', pull: 'clone', put: false }"
      @dragstart="dragEnd($event, droppedMeals)"
      class="w-[500px] grid grid-cols-8 bg-gray-100 rounded p-4 gap-2" :sort="false" :clone="cloneCard">
      <template #item="{ element: meal }" :key="index">
        <div style="height: 79px; width: 50px; overflow: hidden;" class="cursor-pointer bg-white border shadow rounded-md">
          <img :src="meal.img" alt="Carta" :id="meal.id" height="50px" class="object-contain" />
        </div>
      </template>
    </draggable>
  </div>
 <div  ref="componentToPrint" id="printable-grid">
  <div>
    <h4 class="alfa-slab-one-regular" style="text-align: center; margin-bottom: -10px;">JAVIER ANTONIO FÉLIX TORRES</h4>
  </div>
  <draggable v-model="droppedMeals" 
 
  item-key="id" tag="div" :group="{ name: 'cartas' }" 
  class="w-[500px] grid grid-cols-4 grid-rows-4 bg-white p-4 rounded gap min-h-[530px]" :disabled="droppedMeals.length >= 16">
      <template #item="{ element: meal, index }">
        <div class="parentRemoveCard relative bg-white  rounded-lg">
          <img style="border: 2px solid; margin-top: 8px" :src="meal.img" :alt="index" :data-id="index" :id="index" width="100" class="img-pintable w-[110px] h-[160px]" />
          <button @click="removeCard(index)"
          class="removeCard absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
          X</button>
        </div>
      </template>
    </draggable>
  </div>
   <!--  <template>
      <draggable v-model="droppedMeals" 
      ref="componentToPrint"
      item-key="id" tag="div" :group="{ name: 'cartas' }" id="printable-grid"
      class="w-[500px] grid grid-cols-4 grid-rows-4 bg-blue-200 p-4 rounded gap-4 min-h-[530px]" :disabled="droppedMeals.length >= 16">
      <template #item="{ element: meal, index }">
        <div class="relative bg-white p-2 shadow rounded-lg">
          <img style="border: 1px solid" :src="meal.img" :alt="index" :data-id="index" :id="index" width="100" class="w-[110px] h-[150px]" />
          <button @click="removeCard(index)"
          class="removeCard absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
          X</button>
        </div>
      </template>
    </draggable>
  </template> -->
  

</template>


<style scoped>
.alfa-slab-one-regular {
  font-family: "Alfa Slab One", serif;
  font-weight: 400;
  font-style: normal;
}


.sidebar{
  position: fixed;
  top: 0;
  right: -500px;
  background: white;
}
.sidebar.open {
  right: 0;
  transition: right .3s ease-in-out;
}
.sidebar.close {
  right: -500px;
  transition: right .3s ease-in-out;
}
.removeCard {
  display: none;
  opacity: 1;
  transition: opacity 1s ease-in-out, display .3s ease-in-out allow-discrete; 
}
.parentRemoveCard:hover .removeCard {
  display: block;
  top: 0;
  left: 0;
  color: rgb(255, 255, 255);
  width: 100%;
  height: 100%;
  background: black;
  opacity: .7;
  font-size: 2rem;
}
#printable-grid{
  border: 1px solid #c5bbbb;
  border-radius: 5px;
}
@media print {
  #printable-grid {
    margin: 0 auto !important;
    background-image: url('assets/texturas/textura.png');
  }
  .img-pintable{
    border: 4px solid black;
  }

}
/* @media print {
  body * {
    visibility: hidden;
  }
  #printable-grid, #printable-grid * {
    visibility: visible;
  }
  .removeCard{
    display: none;
    visibility: hidden;
  }
  #printable-grid {
    display: grid;
    grid-template-columns: repeat(4, 110px);
    width: 900px;
  }
} */
</style>

