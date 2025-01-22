<script setup lang="ts">
import { ref, watch } from 'vue'
import { AkDownload, CdSave } from '@kalimahapps/vue-icons'

const props = defineProps<{
  onSave: () => void
  imageVal: File | null
}>()
const emits = defineEmits(['update:image'])
const image = ref<string | null>(null)

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        image.value = e.target.result
        emits('update:image', file)
      }
    }
    reader.readAsDataURL(file)
  }
}

function formatSizeInKB(size: number | undefined): string {
  if (!size) return '0 KB'
  if (size >= 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + ' MB'
  }
  return (size / 1024).toFixed(2) + ' KB'
}

// watch
watch(
  () => props.imageVal,
  () => {
    if (!props.imageVal) {
      image.value = null
    }
  },
)
</script>

<template>
  <div class="picker-container flex flex-col gap-2">
    <div class="flex items-center gap-2 max-md:flex-col">
      <div class="file-input-wrapper max-md:w-full">
        <input type="file" @change="handleFileChange" accept="image/*" />
        <button
          class="custom-button flex items-center max-md:w-full justify-center gap-2 font-semibold max-md:rounded-lg rounded-full"
        >
          <AkDownload class="text-xl" />Select Image
        </button>
      </div>
      <div class="max-md:w-full">
        <button
          class="custom-button flex items-center max-md:w-full justify-center gap-2 font-semibold max-md:rounded-lg rounded-full"
          :style="{ backgroundColor: '#ffdc2e' }"
          @click="props.onSave"
          v-if="image"
        >
          <CdSave class="text-xl" />Save
        </button>
      </div>
    </div>
    <div v-if="image" class="bg-[#f8f8f8] lg:w-[50%] flex gap-4 p-2 items-center">
      <div class="image-container">
        <img :src="image" alt="Selected Image" class="image-preview-img" />
      </div>
      <div class="flex flex-col">
        <span class="text-[#0f172a] font-medium text-truncate">{{ props.imageVal?.name }}</span>
        <span class="text-[#0f172a]">{{ formatSizeInKB(props.imageVal?.size) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.picker-container {
  border-radius: 10px;
}
.file-input-wrapper {
  position: relative;
  display: inline-block;
}

input[type='file'] {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.custom-button {
  padding: 10px 20px;
  color: white;
  border: none;
  background-color: #0f172a;
  cursor: pointer;
  font-size: 16px;
}

.image-container {
  max-width: 100px;
  max-height: auto;
  overflow: hidden;
}

.image-preview-img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

@media (max-width: 768px) {
  .text-truncate {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }
}
</style>
