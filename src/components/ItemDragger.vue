
<script lang="ts" setup>
import { ref } from "vue";
import draggable from "vuedraggable";
import { useVueToPrint } from "vue-to-print";

const componentToPrint = ref();
const showCardsAvailable = ref(false);
const userName = ref("Escribe tu nombre")
const logo = new URL("../assets/logo/JARTEC.jpg", import.meta.url).href
// Definir interfaz para una carta
interface Card {
  id: number;
  img: string;
  name: string;
}

// Lista de cartas disponibles (NO se deben perder)
const meals = ref<Card[]>([
  { id: 1, img: new URL("../assets/cartas/small/1 el gallo.jpg", import.meta.url).href, name: "1 el gallo.jpg" },
  { id: 2, img: new URL("../assets/cartas/small/2 el diablito.jpg", import.meta.url).href, name: "2 el diablito.jpg" },
  { id: 3, img: new URL("../assets/cartas/small/3 la dama.jpg", import.meta.url).href, name: "3 la dama.jpg" },
  { id: 4, img: new URL("../assets/cartas/small/4 el catrin.jpg", import.meta.url).href, name: "4 el catrin.jpg" },
  { id: 5, img: new URL("../assets/cartas/small/5 el paraguas.jpg", import.meta.url).href, name: "5 el paraguas.jpg" },
  { id: 6, img: new URL("../assets/cartas/small/6 la sirena.jpg", import.meta.url).href, name: "6 la sirena.jpg" },
  { id: 7, img: new URL("../assets/cartas/small/7 la escalera.jpg", import.meta.url).href, name: "7 la escalera.jpg" },
  { id: 8, img: new URL("../assets/cartas/small/8 la botella.jpg", import.meta.url).href, name: "8 la botella.jpg" },
  { id: 9, img: new URL("../assets/cartas/small/9 barril.jpg", import.meta.url).href, name: "9 barril.jpg" },
  { id: 10, img: new URL("../assets/cartas/small/10 arbol.jpg", import.meta.url).href, name: "10 arbol.jpg" },
  { id: 11, img: new URL("../assets/cartas/small/11 melon.jpg", import.meta.url).href, name: "11 melon.jpg" },
  { id: 12, img: new URL("../assets/cartas/small/12 el valiente.jpg", import.meta.url).href, name: "12 el valiente.jpg" },
  { id: 13, img: new URL("../assets/cartas/small/13 el gorrito.jpg", import.meta.url).href, name: "13 el gorrito.jpg" },
  { id: 14, img: new URL("../assets/cartas/small/14 la muerte.jpg", import.meta.url).href, name: "14 la muerte.jpg" },
  { id: 15, img: new URL("../assets/cartas/small/15 la pera.jpg", import.meta.url).href, name: "15 la pera.jpg" },
  { id: 16, img: new URL("../assets/cartas/small/16 la bandera.jpg", import.meta.url).href, name: "16 la bandera.jpg" },
  { id: 17, img: new URL("../assets/cartas/small/17 el bandolon.jpg", import.meta.url).href, name: "17 el bandolon.jpg" },
  { id: 18, img: new URL("../assets/cartas/small/18 el violoncello.jpg", import.meta.url).href, name: "18 el violoncello.jpg" },
  { id: 19, img: new URL("../assets/cartas/small/19 la garza.jpg", import.meta.url).href, name: "19 la garza.jpg" },
  { id: 20, img: new URL("../assets/cartas/small/20 el pajaro.jpg", import.meta.url).href, name: "20 el pajaro.jpg" },
  { id: 21, img: new URL("../assets/cartas/small/21 la mano.jpg", import.meta.url).href, name: "21 la mano.jpg" },
  { id: 22, img: new URL("../assets/cartas/small/22 la bota.jpg", import.meta.url).href, name: "22 la bota.jpg" },
  { id: 23, img: new URL("../assets/cartas/small/23 la luna.jpg", import.meta.url).href, name: "23 la luna.jpg" },
  { id: 24, img: new URL("../assets/cartas/small/24 el cotorro.jpg", import.meta.url).href, name: "24 el cotorro.jpg" },
  { id: 25, img: new URL("../assets/cartas/small/25 el borracho.jpg", import.meta.url).href, name: "25 el borracho.jpg" },
  { id: 26, img: new URL("../assets/cartas/small/26 el negrito.jpg", import.meta.url).href, name: "26 el negrito.jpg" },
  { id: 27, img: new URL("../assets/cartas/small/27 el corazon.jpg", import.meta.url).href, name: "27 el corazon.jpg" },
  { id: 28, img: new URL("../assets/cartas/small/28 la sandia.jpg", import.meta.url).href, name: "28 la sandia.jpg" },
  { id: 29, img: new URL("../assets/cartas/small/29 el tambor.jpg", import.meta.url).href, name: "29 el tambor.jpg" },
  { id: 30, img: new URL("../assets/cartas/small/30 el camaron.jpg", import.meta.url).href, name: "30 el camaron.jpg" },
  { id: 31, img: new URL("../assets/cartas/small/31 las jaras.jpg", import.meta.url).href, name: "31 las jaras.jpg" },
  { id: 32, img: new URL("../assets/cartas/small/32 el musico.jpg", import.meta.url).href, name: "32 el musico.jpg" },
  { id: 33, img: new URL("../assets/cartas/small/33 la arana.jpg", import.meta.url).href, name: "33 la arana.jpg" },
  { id: 34, img: new URL("../assets/cartas/small/34 el soldado.jpg", import.meta.url).href, name: "34 el soldado.jpg" },
  { id: 35, img: new URL("../assets/cartas/small/35 la estrella.jpg", import.meta.url).href, name: "35 la estrella.jpg" },
  { id: 36, img: new URL("../assets/cartas/small/36 el cazo.jpg", import.meta.url).href, name: "36 el cazo.jpg" },
  { id: 37, img: new URL("../assets/cartas/small/37 el mundo.jpg", import.meta.url).href, name: "37 el mundo.jpg" },
  { id: 38, img: new URL("../assets/cartas/small/38 el apache.jpg", import.meta.url).href, name: "38 el apache.jpg" },
  { id: 39, img: new URL("../assets/cartas/small/39 el nopal.jpg", import.meta.url).href, name: "39 el nopal.jpg" },
  { id: 40, img: new URL("../assets/cartas/small/40 el alacran.jpg", import.meta.url).href, name: "40 el alacran.jpg" },
  { id: 41, img: new URL("../assets/cartas/small/41 la rosa.jpg", import.meta.url).href, name: "41 la rosa.jpg" },
  { id: 42, img: new URL("../assets/cartas/small/42 la calavera.jpg", import.meta.url).href, name: "42 la calavera.jpg" },
  { id: 43, img: new URL("../assets/cartas/small/43 la campana.jpg", import.meta.url).href, name: "43 la campana.jpg" },
  { id: 44, img: new URL("../assets/cartas/small/44 el cantarito.jpg", import.meta.url).href, name: "44 el cantarito.jpg" },
  { id: 45, img: new URL("../assets/cartas/small/45 el venado.jpg", import.meta.url).href, name: "45 el venado.jpg" },
  { id: 46, img: new URL("../assets/cartas/small/46 el sol.jpg", import.meta.url).href, name: "46 el sol.jpg" },
  { id: 47, img: new URL("../assets/cartas/small/47 la corona.jpg", import.meta.url).href, name: "47 la corona.jpg" },
  { id: 48, img: new URL("../assets/cartas/small/48 la chalupa.jpg", import.meta.url).href, name: "48 la chalupa.jpg" },
  { id: 49, img: new URL("../assets/cartas/small/49 el pino.jpg", import.meta.url).href, name: "49 el pino.jpg" },
  { id: 50, img: new URL("../assets/cartas/small/50 el pescado.jpg", import.meta.url).href, name: "50 el pescado.jpg" },
  { id: 51, img: new URL("../assets/cartas/small/51 la palma.jpg", import.meta.url).href, name: "51 la palma.jpg" },
  { id: 52, img: new URL("../assets/cartas/small/52 la maceta.jpg", import.meta.url).href, name: "52 la maceta.jpg" },
  { id: 53, img: new URL("../assets/cartas/small/53 el arpa.jpg", import.meta.url).href, name: "53 el arpa.jpg" },
  { id: 54, img: new URL("../assets/cartas/small/54 la rana.jpg", import.meta.url).href, name: "54 la rana.jpg" },
]);


//#region print

  const {handlePrint} = useVueToPrint({
    content: componentToPrint,
    documentTitle: "loteria-mexicana",
    //removeAfterPrint: true,
  });
  
  const handleDataBeforePrint = () =>{
    console.log("dropppedMeals before: ", droppedMeals.value);
    let finish = false;
    if(droppedMeals.value.length > 0){
      droppedMeals.value.forEach((element:any) => {
        element.img = new URL("../assets/cartas/" + element.name, import.meta.url).href;
      });
      finish = true;
      console.log("dropppedMeals after: ", droppedMeals.value);
      
      if(finish){
        handlePrint()
      }
    }
  }

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

function generateUniqueRandoms(count=16, min = 0, max = 54) {
  const used = new Set();
  const result = [];
  droppedMeals.value = [];
  while (result.length < count) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!used.has(random)) {
      used.add(random);
      const item = meals.value[random];
      item.img = new URL("../assets/cartas/" + item.name, import.meta.url).href;
      droppedMeals.value.push(item);
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


</script>

<template>
  <div class="m-3">

    <span @click="shuffleCards" class="p-2 bg-blue-200 cursor-pointer text-white rounded-md mb-4" style="background-color: chocolate;">
      <v-icon name="bi-shuffle" scale="1" />
    </span>
    <span @click="handleDataBeforePrint" class="p-2 bg-blue-200 cursor-pointer text-white rounded-md mb-4" style="background-color: rebeccapurple;">
      <v-icon name="md-localprintshop-round" scale="1" />
    </span>
    <span @click="showAvailableCards" class="p-2 bg-blue-200 cursor-pointer text-white rounded-md mb-4" style="background-color: green;">
      <v-icon name="gi-card-exchange" scale="1" />
    </span>
  </div>
  
 
  
  <div class="m-2">
    <input type="text" class="px-2 py-1 border rounded" v-model="userName" placeholder="Escribe tu nombre">
  </div>

  <!-- Lista de cartas disponibles -->
  <div class="sidebar" :show="showCardsAvailable" :class="showCardsAvailable ? 'open': 'close'">
    <button @click=closeAvailableCards>close</button>
    <draggable v-model="meals"  item-key="id" tag="div" :group="{ name: 'cartas', pull: 'clone', put: false }"
      @dragstart="dragEnd($event, droppedMeals)"
      class="w-full grid grid-cols-6 bg-gray-100 rounded p-4 gap-2" style="max-height: 500px; overflow: auto; z-index: 10" :sort="false" :clone="cloneCard">
      <template #item="{ element: meal }" :key="index">
        <div style="height: 79px; width: 50px; overflow: hidden;" class="cursor-pointer bg-white border shadow rounded-md">
          <img :src="meal.img" alt="Carta" :id="meal.id" height="50px" class="object-contain" />
        </div>
      </template>
    </draggable>
  </div>
 <div  ref="componentToPrint" id="printable-grid">
  <div>
    <h4 class="alfa-slab-one-regular" style="text-align: center; margin-bottom: -10px;">{{ userName }}</h4>
  </div>
  <draggable v-model="droppedMeals" 
 
  item-key="id" tag="div" :group="{ name: 'cartas' }" 
  class="w-[500px] grid grid-cols-4 grid-rows-4 bg-white p-4 rounded gap min-h-[530px]" :disabled="droppedMeals.length >= 16">
      <template #item="{ element: meal, index }">
        <div class="parent-remove-card relative bg-white  rounded-lg">
          <img style="border: 2px solid; margin-top: 8px" :src="meal.img" :alt="index" :data-id="index" :id="index" width="100" class="img-pintable w-[110px] h-[160px]" />
          <button @click="removeCard(index)"
          class="btn-remove-card absolute top-1 right-1 bg-red-500 text-white text-xs rounded">
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
.btn-remove-card{
  display: none;
  position: absolute;
    top: 0;
    right: 0;
    color: black;
}
/* .btn-remove-card {
  display: none;
  opacity: 1;
  transition: opacity 1s ease-in-out, display .3s ease-in-out allow-discrete; 
} */
.parent-remove-card:hover .btn-remove-card{
  display: block;
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

