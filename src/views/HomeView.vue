<script setup lang="ts">
import { AkTiktokFill, AkInstagramFill } from '@kalimahapps/vue-icons'
</script>

<template>
  <main>
    <section class="welcome-section max-lg:h-[40vh] lg:h-[60vh]">
      <h1
        class="text-center text-[#0f172a] font-bold lg:text-6xl max-lg:text-4xl animate__animated animate__fadeInDown"
      >
        Welcome to FS Daycare
      </h1>
      <p
        class="font-normal text-[#0f172a] text-center lg:text-lg max-lg:text-sm animate__animated animate__fadeIn max-lg:mt-4"
      >
        A nurturing environment where your child's growth and happiness are our top priorities.
      </p>
    </section>

    <section class="w-full">
      <img
        src="../assets/kid.jpg"
        alt="image-kid"
        class="ml-auto mr-auto p-3 animate__animated animate__fadeIn"
      />
    </section>

    <section class="flex max-lg:flex-wrap mt-10">
      <div class="flex flex-col gap-6 mb-6">
        <h2 class="lg:text-6xl font-semibold max-lg:text-4xl text-[#0f172a]">
          Get in Touch with FS Daycare
        </h2>
        <span class="text-[#0f172a]"
          >We're here to answer any questions you may have about our services.</span
        >
      </div>
      <div>
        <img src="../assets/kid2.jpg" class="ml-auto mr-auto p-3" alt="" />
      </div>
    </section>

    <section id="contact" class="my-8 border-t border-[#c8c8c8] pt-4">
      <h3 class="capitalize text-2xl font-semibold text-[#0f172a]">contact information</h3>
      <div class="flex lg:items-baseline max-lg:flex-col">
        <article>
          <h4 class="capitalize font-medium">main office hours</h4>
          <span class="text-[#0f172a]">Every day 24/7</span>
        </article>
        <article>
          <h4 class="capitalize font-medium">our location</h4>
          <span class="text-[#0f172a]">Location</span>
        </article>
        <article>
          <h4 class="capitalize font-medium">contact us</h4>
          <span class="text-[#0f172a]">+1 484-506-3720</span>
          <span class="lowercase text-[#0f172a]">FSDAYCARE1114@GMAIL.COM</span>
        </article>
      </div>
    </section>
  </main>

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
    </div>
    <span>© FS Daycare 2025, Creating a World of Fun and Learning</span>
  </footer>
</template>

<style scoped>
main {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.welcome-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(90deg, #fff, rgb(255, 239, 246), #fff);
}

p {
  color: #0f172a;
}
img {
  border-radius: 20px;
  border: 1px solid #c8c8c8;
}

article {
  display: flex;
  flex-direction: column;
  gap: 10;
  width: 250px;
}

article > h4 {
  color: #dca904;
  line-height: 3;
}

.icon {
  font-size: 20px;
}
@media (max-width: 1024px) {
  main {
    width: 90%;
  }
}
@media (min-width: 1024px) {
  h1 {
    line-height: 2em;
  }
}
</style>
