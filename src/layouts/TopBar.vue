<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, RouterLink, useRoute, useRouter } from 'vue-router'
import {
  AnOutlinedClose,
  BsArrowRight,
  CgMenu,
  TiSocialInstagram,
  TaMoodKid,
  AkHomeAlt1,
} from '@kalimahapps/vue-icons'
import FooterDaycare from '@/components/FooterDaycare.vue'
//
const route = useRoute()
const router = useRouter()
const dropDownMenu = ref<HTMLDivElement | null>(null)
const dropDownIsOpen = ref(true)
const routes = [
  {
    name: 'home',
    route: '/',
    icon: AkHomeAlt1,
  },

  {
    name: 'activities',
    route: '/activities',
    icon: TaMoodKid,
  },

  {
    name: 'Pictures',
    route: '/pictures',
    icon: TiSocialInstagram,
  },
]
function handleToggle() {
  if (dropDownMenu.value) {
    dropDownMenu.value.classList.toggle('open')
    dropDownIsOpen.value = dropDownMenu.value.classList.contains('open')
  }
}

async function scrollTo() {
  if (route.name !== 'home') {
    await router.push({ name: 'home' })
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<template>
  <div class="container">
    <header class="relative bg-[#ffdc2e]">
      <div class="navbar h-[60px] flex justify-between items-center w-full py-3 px-10">
        <div>
          <h2 class="lg:text-xl max-lg:text-lg font-bold text-[#0f172a]">FS Daycare</h2>
        </div>
        <nav class="nav flex gap-10">
          <RouterLink
            v-for="(route, index) in routes"
            :key="index"
            :to="route.route"
            class="link capitalize flex outline-none items-center gap-2 lg:text-lg max-lg:text-md font-normal text-[#0f172a]"
          >
            <component :is="route.icon" class="inline-block" />
            {{ route.name }}</RouterLink
          >
        </nav>

        <button
          class="flex items-center gap-2 border border-black px-4 py-2 rounded-full"
          @click="scrollTo"
        >
          Contact Us <BsArrowRight />
        </button>
        <div @click="handleToggle" class="toggle_btn">
          <CgMenu v-if="!dropDownIsOpen" />
          <AnOutlinedClose v-else />
        </div>
      </div>

      <div class="dropdown_menu open" ref="dropDownMenu">
        <li v-for="(route, index) in routes" :key="index">
          <RouterLink
            :to="route.route"
            class="link gap-2 flex items-center lg:text-lg outline-none max-lg:text-md font-normal capitalize"
          >
            <component :is="route.icon" class="inline-block" />{{ route.name }}</RouterLink
          >
        </li>

        <li>
          <button
            class="flex items-center cursor-pointer gap-2 w-full justify-center border mr-auto text-[#0f172a] ml-auto border-black px-4 py-2 rounded-full"
            @click="scrollTo"
          >
            Contact Us <BsArrowRight />
          </button>
        </li>
      </div>
    </header>

    <RouterView />

    <FooterDaycare />
  </div>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 50;
}

.container {
  min-width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

footer {
  margin-top: auto;
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
