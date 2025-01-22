<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { AxiosError } from 'axios'
import picture from '@/api/Picture'
import type { Image } from '@/types/Image'
import { notify } from '@kyvg/vue3-notification'
import {
  AkCircleX,
  AkImage,
  AkEyeSlashed,
  AkEyeOpen,
  MdOutlinedPhotoCamera,
} from '@kalimahapps/vue-icons'
import ImageVue from 'primevue/image'
import ImagePicker from '@/components/ImagePicker.vue'
import LoadingOverlay from 'vue-loading-overlay'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { useAuthStore } from '@/stores/auth'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, A11y, Thumbs } from 'swiper/modules'

//
const image = ref<File | null>(null)
const loading = ref<boolean>(false)
const loadingLast = ref<boolean>(false)
const loadingSave = ref<boolean>(false)
const visible = ref<boolean>(true)
const inputType = ref<boolean>(false)
const images = ref<Image[]>([])
const latestImages = ref<Image[]>([])
const authPassword = ref<string>('')
const store = useAuthStore()

// functions
async function compressImage(file: File): Promise<File> {
  const maxSizeMB = 1
  const maxSizeBytes = maxSizeMB * 1024 * 1024

  if (file.size <= maxSizeBytes) {
    return file
  }

  const imageBitmap = await createImageBitmap(file)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = imageBitmap.width
  canvas.height = imageBitmap.height
  ctx?.drawImage(imageBitmap, 0, 0)

  let quality = 0.7
  let compressedFile = await new Promise<File>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(new File([blob], file.name, { type: file.type }))
        } else {
          reject(new Error('Failed to create blob.'))
        }
      },
      file.type,
      quality,
    )
  })

  while (compressedFile.size > maxSizeBytes && quality > 0.1) {
    quality -= 0.1
    compressedFile = await new Promise<File>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: file.type }))
          } else {
            reject(new Error('Failed to create blob.'))
          }
        },
        file.type,
        quality,
      )
    })
  }

  return compressedFile
}

async function savePicture() {
  try {
    loadingSave.value = true
    if (image.value) {
      const compressedImage = await compressImage(image.value)
      const formData = new FormData()
      formData.append('file', compressedImage)
      await picture.uploadPicture(formData)
      getPictures()
      getLatestPictures()
    }
  } catch (err: unknown) {
    console.error('Error saving photo:', err)
  } finally {
    loadingSave.value = false
    image.value = null
  }
}

async function getPictures() {
  try {
    loading.value = true
    const { data } = await picture.getPictures()
    images.value = [...data.images]
  } catch (error: unknown) {
    console.error('Error getting photo:', error)
  } finally {
    loading.value = false
  }
}

async function getLatestPictures() {
  try {
    loadingLast.value = true
    const { data } = await picture.getLatestPictures()
    latestImages.value = [...data.images]
  } catch (error: unknown) {
    console.error('Error getting photo:', error)
  } finally {
    loadingLast.value = false
  }
}
async function deletePicture(public_id: string) {
  try {
    await picture.deletePictures(public_id)
    getPictures()
    getLatestPictures()
  } catch (error: unknown) {
    console.error(error)
  }
}

async function validatePictures() {
  try {
    if (authPassword.value) {
      await picture.validatePictures({ authPassword: authPassword.value })
      store.setAuth(true, true)
      visible.value = false
    } else {
      notify({ title: 'Warning', text: 'You must fill in the field', type: 'warn' })
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response)
        notify({ title: 'Error', text: error.response.data.message, type: 'error' })
    }
  }
}
function handleDialog(type: 'NEVERSHOW' | 'SAVE') {
  if (type === 'NEVERSHOW') {
    store.setAuth(false, true)
    visible.value = false
  } else if (type === 'SAVE') {
    validatePictures()
  }
}

// mounted
onMounted(() => {
  if (!store.neverShowAgain) {
    visible.value = true
  } else {
    visible.value = false
  }
  getPictures()
  getLatestPictures()
})

// computed
const isLoading = computed(() => {
  return loading.value || loadingSave.value || loadingLast.value
})
</script>

<template>
  <main class="py-4">
    <section v-if="!loading && !loadingLast && store.isAuthenticated && store.neverShowAgain">
      <ImagePicker @update:image="image = $event" :image-val="image" :onSave="savePicture" />
    </section>
    <section v-if="latestImages.length > 0 && !loading && !loadingLast" class="my-4">
      <h3 class="flex items-center gap-2 text-xl font-medium">
        <MdOutlinedPhotoCamera class="text-2xl text-[#0f172a]" />
        Latest Pictures
      </h3>
      <swiper
        :modules="[Autoplay, Pagination, A11y, Thumbs]"
        effect="thumbs"
        :autoplay="true"
        :breakpoints="{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          '@1.50': {
            slidesPerView: 4,
            spaceBetween: 5,
          },
        }"
        class="w-[100%] max-md:h-[450px] h-[500px] mt-4"
        :pagination="{ clickable: true }"
      >
        <swiper-slide v-for="(image, index) in latestImages" :key="index">
          <img :src="image.url" alt="Image" class="w-full max-md:h-[450px] h-[500px]" />
        </swiper-slide>
      </swiper>
    </section>

    <section v-if="images.length > 0 && !loading && !loadingLast">
      <h3 class="flex items-center gap-2 my-4 text-xl font-medium">
        <AkImage class="text-2xl text-[#0f172a]" />All Pictures
      </h3>
      <div
        class="max-lg:grid grid grid-cols-5 max-lg:grid-cols-3 justify-center flex-wrap max-md:grid-cols-2 max-md:justify-between gap-2"
      >
        <div class="relative flex justify-center" v-for="(image, index) in images" :key="index">
          <ImageVue :src="image.url" alt="Image" width="300" preview />
          <AkCircleX
            v-if="store.isAuthenticated && store.neverShowAgain"
            @click="deletePicture(image.public_id)"
            class="icon text-white text-3xl"
          />
        </div>
      </div>
    </section>
    <div
      class="flex justify-center items-center gap-2 my-2"
      v-else-if="!loading && !loadingLast && (images.length == 0 || latestImages.length == 0)"
    >
      <AkImage class="text-xl text-[#0f172a]" />
      <span class="text-xl text-[#0f172a]">No pictures uploaded</span>
    </div>
    <LoadingOverlay v-model:active="isLoading" :is-full-page="true" />
    <notifications position="bottom right" />
  </main>

  <Dialog
    v-if="!loading"
    v-model:visible="visible"
    modal
    header="Auth (Optional)"
    :style="{ width: '25rem' }"
  >
    <div class="flex items-center gap-4 mb-4 relative">
      <label for="auth" class="font-semibold w-24">Auth Password</label>
      <input
        id="auth"
        :type="inputType ? 'text' : 'password'"
        class="flex-auto outline-none border-2 p-1 rounded-md border-gray-200"
        v-model="authPassword"
      />
      <AkEyeOpen
        class="absolute right-2 cursor-pointer"
        v-if="!inputType"
        @click="inputType = !inputType"
      />
      <AkEyeSlashed
        class="absolute right-2 cursor-pointer"
        v-else
        @click="inputType = !inputType"
      />
    </div>

    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Do not show again"
        severity="danger"
        @click="handleDialog('NEVERSHOW')"
      />
      <Button type="button" label="Save" @click="handleDialog('SAVE')" />
    </div>
  </Dialog>
</template>

<style scoped>
main {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.icon {
  position: absolute;
  top: 5px;
  transition-duration: 300ms;
  z-index: 10;
  left: 5px;
  cursor: pointer;
}
</style>
