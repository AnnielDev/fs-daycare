<script setup lang="ts">
import {
  BsMusicNoteBeamed,
  BsBookFill,
  FaPaintbrush,
  AnOutlinedScissor,
} from '@kalimahapps/vue-icons'
</script>
<template>
  <main>
    <section class="flex flex-col my-6 gap-4 animate__animated animate__fadeInDown">
      <h3 class="capitalize font-semibold text-[16px]">Inspiring Young Minds</h3>
      <h1 class="capitalize font-semibold lg:text-6xl max-lg:text-4xl text-[#0f172a]">
        FS Daycare Activities
      </h1>
      <p class="lg:text-[18px] text-[#0f172a] max-w-xl">
        Discover a world of fun and learning with our diverse range of activities designed to engage
        and educate children.
      </p>
    </section>
    <section class="mt-20 animate__animated animate__fadeIn">
      <h3 class="capitalize font-bold text-center text-[16px]">Nurturing Growth</h3>
      <h2 class="text-center lg:text-[36px] max-lg:text-3xl text-[#0f172a] font-semibold">
        Engaging Learning Activities
      </h2>
      <p class="lg:text-[18px] text-center text-[#0f172a] max-w-2xl ml-auto mr-auto">
        Our activities are designed to promote cognitive and social development in a fun and
        engaging way.
      </p>
      <div class="flex lg:items-center mt-6 gap-10 justify-between max-lg:flex-col">
        <article class="flex items-center gap-6">
          <div class="text-white bg-[#ffcc00] text-3xl p-2 rounded-md">
            <BsBookFill />
          </div>
          <div class="flex flex-col">
            <h4 class="text-[#0f172a] font-semibold">Storytelling</h4>
            <p class="text-[#0f172a]">
              Enhance imagination and language skills through interactive storytelling sessions.
            </p>
          </div>
        </article>
        <article class="flex items-center gap-6">
          <div class="text-white bg-[#ffcc00] text-3xl p-2 rounded-md">
            <BsMusicNoteBeamed />
          </div>
          <div class="flex flex-col">
            <h4 class="text-[#0f172a] font-semibold">Music & Movement</h4>
            <p class="text-[#0f172a]">
              Boost physical coordination and rhythm with music and dance activities.
            </p>
          </div>
        </article>
      </div>
    </section>

    <section class="flex my-12 max-lg:flex-col gap-4 animate__animated animate__fadeIn">
      <article>
        <h3 class="capitalize font-bold text-[16px]">Creative Arts & Crafts</h3>
        <h2 class="lg:text-[36px] max-lg:text-3xl text-[#0f172a] font-semibold">
          Fostering Creativity
        </h2>
        <p class="lg:text-[20px] text-[#0f172a] max-w-2xl">
          Our arts and crafts sessions encourage children to express themselves creatively and
          develop fine motor skills.
        </p>
        <div class="mt-6">
          <p class="text-[#0f172a]">
            Children explore various materials and techniques, enhancing their creativity and
            problem-solving skills.
          </p>

          <article class="flex items-stretch gap-4 mt-6">
            <FaPaintbrush class="text-2xl text-[#ffcc00]" />
            <div>
              <h4 class="text-[#0f172a] font-semibold">Painting</h4>
              <p class="text-[#0f172a] leading-loose">
                Experiment with colors and textures using different painting techniques.
              </p>
            </div>
          </article>
          <article class="flex items-stretch gap-4 mt-6">
            <AnOutlinedScissor class="scissor-icon text-[#ffcc00]" />
            <div>
              <h4 class="text-[#0f172a] font-semibold">Crafting</h4>
              <p class="text-[#0f172a] leading-loose">
                Create fun and imaginative crafts using safe, child-friendly materials.
              </p>
            </div>
          </article>
        </div>
      </article>
      <article>
        <img src="../assets/kids.jpg" alt="daycare_image_kid" class="lg:max-w-2xl p-3" />
      </article>
    </section>
  </main>
</template>

<style scoped>
main {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
h2 {
  line-height: 2;
}
h3 {
  color: #ffcc00;
}

p {
  word-wrap: break-word;
  line-height: 2;
}
img {
  border-radius: 20px;
  border: 1px solid #c8c8c8;
}

.scissor-icon {
  font-size: 30px;
}
</style>
