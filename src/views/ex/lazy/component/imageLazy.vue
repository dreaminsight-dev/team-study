<template>
  <div :class="['lazy', isLazy && 'ani']" :style="{width: props.width + 'px', height: props.height + 'px'}">
    <template v-if="!isLoaded">loading...</template>
    <transition name="fade" @after-enter="unLazy">
      <img :src="imageSource" @load="onImageLoad" v-show="isLoaded" />
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, defineProps, getCurrentInstance } from 'vue'

const vue = getCurrentInstance()
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  scrollTop: {
    type: Number,
    required: true,
  },
  width: [String, Number],
  height: [String, Number],
  name: String,
})

let imageSource = ref('')
let isLoaded = ref(false)
let isLazy = ref(true)
let scrollTop = ref(0)
let screenHeight = ref(0)
let elHeight = ref(0)
let offsetTop = ref(0)
let timeout = null

watch(() => props.scrollTop, (top) => {
  clearTimeout(timeout)

  if (!isLoaded.value) {
    console.log(top)

    if (scrollCalc()) {
      timeout = setTimeout(() => {
        imageSource.value = props.src
      }, 1000)
    } else {
      imageSource.value = ''
    }
  }
})

// let isShow = computed(() => {
//   if (!isLoaded.value) {
//     return (scrollTop.value + screenHeight.value) > offsetTop.value
//   } else {
//     return true
//   }
// })

const unLazy = () => {
  isLazy.value = false
}

const scrollCalc = () => {
  return (props.scrollTop + screenHeight.value) > offsetTop.value
}

const onImageLoad = () => {
  isLoaded.value = true
}

onMounted(() => {
  screenHeight.value = window.screen.height
  elHeight.value = vue.ctx.$el.offsetHeight
  offsetTop.value = vue.ctx.$el.offsetTop

  setTimeout(() => {
    imageSource.value = scrollCalc() ? props.src : ''
  }, 1000)
})
</script>

<style scoped>
.lazy {
  display: flex; flex-direction: row; align-items: center; justify-content: center;;
  overflow: hidden; border-radius: 5px;
}

.ani {
  background: linear-gradient(45deg, #eed752, #e73c7e, #23a6d5, #b4d523);
  animation: bg 5s ease infinite;
  font-weight: bold; font-size: 2rem;
  background-size: 200% 200%;
  color: #fff;
}

.lazy img {width: 100%; height: auto;}

@keyframes bg {
  0% {background-position: 0% 100%}
  50% {background-position: 100% 0%}
  100% {background-position: 0% 100%}
}

.fade-enter-from, .fade-leave-to {opacity: 0;}
.fade-enter-active, .fade-leave-active {transition: opacity 1s ease;}
</style>