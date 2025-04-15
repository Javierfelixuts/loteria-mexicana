<script lang="ts" setup>
import { useDropZone } from '@vueuse/core'
import { shallowRef, useTemplateRef } from 'vue'
const props = defineProps(['elementRefName']);
console.log("props: ", props);
const filesData = shallowRef<{ name: string, size: number, type: string, lastModified: number }[]>([])
const imageFilesData = shallowRef<{ name: string, size: number, type: string, lastModified: number }[]>([])

function onDrop(files: File[] | null) {
  console.log("okok")
  filesData.value = []
  if (files) {
    filesData.value = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }))
  }
}

function onImageDrop(files: File[] | null, event?: DragEvent) {
  console.log("dropped");
  imageFilesData.value = [];

  if (files?.length) {
    // If it's a file from the computer
    imageFilesData.value = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }));
  } else if (event?.dataTransfer?.getData("text/plain")) {
    // If it's an image URL from CardDrag
    const imageUrl = event.dataTransfer.getData("text/plain");
    console.log("Dropped Image URL: ", imageUrl);

    // Display the dragged image
    imageFilesData.value = [{ name: "Dragged Image", size: 0, type: "image/png", lastModified: Date.now() }];

    // Append image to the drop area dynamically
    const img = document.createElement('img');
    img.src = imageUrl;
    img.width = 150;
    img.height = 250;
    img.style.marginTop = '10px';
    
    document.querySelector('.image-drop-container')?.appendChild(img);
  }
}

const dropZoneRef = useTemplateRef<HTMLElement>('dropZoneRef')
const imageDropZoneRef = useTemplateRef<HTMLElement>(props.elementRefName)

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)

const { isOverDropZone: isOverImageDropZone } = useDropZone(imageDropZoneRef, {
  dataTypes: ['image/png', 'text/plain'], // Accept both image files and URLs
  onDrop: (files, event) => onImageDrop(files, event),
});
</script>

<template>
  <div class="flex flex-col w-full min-h-200px h-auto bg-gray-400/10 justify-center items-center mt-6 rounded">
    <div class="w-full h-auto relative">
      <h3>Prop {{ props.elementRefName }}</h3>
      <p>Drop files from your computer on to drop zones</p>

      <div grid="~ cols-2 gap-2">
        <div
          ref="dropZoneRef"
          class="flex flex-col w-full min-h-200px h-auto bg-gray-400/10 justify-center items-center mt-6 rounded"
        >
          <div font-bold mb2>
            General DropZone
          </div>
          <div>
            isOverDropZone:{{ isOverImageDropZone }}
          </div>
          <div class="flex flex-wrap justify-center items-center">
            <div v-for="(file, index) in filesData" :key="index" class="w-200px bg-black-200/10 ma-2 pa-6">
              <p>Name: {{ file.name }}</p>
              <p>Size: {{ file.size }}</p>
              <p>Type: {{ file.type }}</p>
              <p>Last modified: {{ file.lastModified }}</p>
            </div>
          </div>
        </div>
        <div
          :ref="props.elementRefName"
          class="flex flex-col w-full min-h-200px h-auto bg-gray-400/10 justify-center items-center mt-6 rounded"
        >
          <div font-bold mb2>
            Image DropZone
          </div>
          <div>
            isOverDropZone: {{ isOverImageDropZone }}
          </div>
          <div class="flex flex-wrap justify-center items-center">
            <div v-for="(file, index) in imageFilesData" :key="index" class="w-200px bg-black-200/10 ma-2 pa-6">
              <p>Name: {{ file.name }}</p>
              <p>Size: {{ file.size }}</p>
              <p>Type: {{ file.type }}</p>
              <p>Last modified: {{ file.lastModified }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>