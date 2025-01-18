<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { AnOutlinedClose } from '@kalimahapps/vue-icons'
import { BsArrowRight } from '@kalimahapps/vue-icons'
import { CgMenu } from '@kalimahapps/vue-icons'

const dropDownMenu = ref<HTMLDivElement | null>(null)
const dropDownIsOpen = ref(true)
function handleToggle() {
  if (dropDownMenu.value) {
    dropDownMenu.value.classList.toggle('open')
    dropDownIsOpen.value = dropDownMenu.value.classList.contains('open')
    window.scrollTo(0, 1000)
  }
}

function scrollTo() {
  const contactSection = document.querySelector('#contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <header class="relative bg-[#ffdc2e]">
    <div class="navbar h-[60px] flex justify-between items-center w-full py-3 px-10">
      <div>
        <h2 class="lg:text-xl max-lg:text-lg font-bold text-[#0f172a]">FS Daycare</h2>
      </div>
      <nav class="nav flex gap-10">
        <RouterLink to="/" class="link lg:text-lg max-lg:text-md font-normal text-[#0f172a]"
          >Home</RouterLink
        >
        <RouterLink
          to="/activities"
          class="link lg:text-lg max-lg:text-md font-normal text-[#0f172a]"
          >Activities</RouterLink
        >
      </nav>

      <button
        class="flex items-center gap-2 border border-black px-4 py-2 rounded-full"
        :onclick="scrollTo"
      >
        Contact Us <BsArrowRight />
      </button>
      <div :onclick="handleToggle" class="toggle_btn">
        <CgMenu v-if="!dropDownIsOpen" />
        <AnOutlinedClose v-else />
      </div>
    </div>

    <div class="dropdown_menu open" ref="dropDownMenu">
      <li>
        <RouterLink to="/" class="link lg:text-lg max-lg:text-md font-normal">Home</RouterLink>
      </li>

      <li>
        <RouterLink to="/activities" class="link lg:text-lg max-lg:text-md font-normal"
          >Activities</RouterLink
        >
      </li>
      <li>
        <button
          class="flex items-center cursor-pointer gap-2 w-full justify-center border mr-auto text-[#0f172a] ml-auto border-black px-4 py-2 rounded-full"
          :onclick="scrollTo"
        >
          Contact Us <BsArrowRight />
        </button>
      </li>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 50;
}
.link {
  transition: 0.5s all ease;
  position: relative;
  color: #0f172a;
}
.link::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #0f172a;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}
.link:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.toggle_btn {
  font-size: 1.5em;
  cursor: pointer;
  display: none;
}
.dropdown_menu {
  display: none;
  position: absolute;
  right: 2rem;
  top: 60px;
  width: 300px;
  height: 0;
  background-color: rgba(252, 192, 217, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 10px;
  overflow: hidden;
  z-index: 10;
  transition: height 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.dropdown_menu > li {
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0.7rem;
}
.dropdown_menu.open {
  height: 200px;
}
@media (max-width: 1024px) {
  nav,
  .navbar button {
    display: none;
  }

  .toggle_btn {
    display: block;
  }
  .dropdown_menu {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}

@media (max-width: 720px) {
  .dropdown_menu {
    left: 2rem;
    width: unset;
  }
}
</style>
