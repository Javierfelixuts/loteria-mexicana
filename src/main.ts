import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import './icons'; // 👈 solo importas este archivo una vez
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaFlag, RiZhihuFill } from "oh-vue-icons/icons";
import { MdLocalprintshopRound } from 'oh-vue-icons/icons/md';

addIcons(FaFlag, RiZhihuFill, MdLocalprintshopRound);

createApp(App).component("v-icon", OhVueIcon).mount('#app')
