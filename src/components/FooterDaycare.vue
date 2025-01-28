<script setup lang="ts">
import { AkTiktokFill, AkInstagramFill, BsFacebook } from '@kalimahapps/vue-icons'
const date = new Date()
</script>
<template>
  <footer
    class="flex justify-between md:items-center max-lg:gap-4 bg-[#fffee8] px-10 py-4 max-lg:flex-col"
  >
    <div class="flex items-center gap-4">
      <a href="https://www.tiktok.com/@frankberroa?_t=ZP-8t9JcoZW74Q&_r=1" target="_blank">
        <AkTiktokFill class="icon" />
      </a>
      <a href="https://www.instagram.com/frankberroa5/" target="_blank">
        <AkInstagramFill class="icon" />
      </a>
      <a href="https://www.facebook.com/frank.berroa1" target="_blank">
        <BsFacebook class="icon" />
      </a>
    </div>
    <span>© FS Daycare {{ date.getFullYear() }}, Creating a World of Fun and Learning</span>
  </footer>
</template>

<style scoped>
.icon {
  font-size: 20px;
}
</style>
