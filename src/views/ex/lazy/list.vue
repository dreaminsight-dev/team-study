<template>
  <h1 class="text-center my-10">Lazy 섬네일 게시판</h1>

  <template v-if="items.length > 0">
    <div class="item-group">
      <div
        class="item"
        :key="`list-item-${item.idx}`"
        v-for="item in items">
        <div class="item-box">
          <div class="lazy ani" :style="{width: item.width + 'px', height: item.height + 'px'}">
            <div>loading...</div>
          </div>
          <div>{{ item.name }}</div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="no-data">등록된 이미지가 없습니다.</div>
  </template>
</template>

<script setup>
import { ref } from 'vue'

let items = ref(Array.from({length: 6}, (v, i) => ({
  name: '이미지 목록 테스트 ' + (i + 1),
  src: '',
  width: '100%',
  height: '260'
})))
</script>

<style scoped>
.no-data {text-align: center; border: 1px solid rgb(163, 163, 163); line-height: 100px; border-radius: 5px;}
.item-group {list-style: none; width: 100%; display: flex; flex-wrap: wrap; margin: 0; padding: 0;}
.item-group .item {box-sizing: border-box; width: 50%; padding: 5px;}
.item-group .item .item-box {width: 100%; height: auto; border: 1px solid rgb(221, 221, 221);}
.btn-write {
  display: block; position: fixed; bottom: 30px; right: 30px; border-radius: 30px; width: 60px; line-height: 60px; height: 60px;
  color: #fff; text-align: center; font-size: 25px;
}

.scale-enter-from, .scale-leave-to {transform: scale(0)}
.scale-enter-active, .scale-leave-active {transition: transform .2s ease;}


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
@keyframes bg {
  0% {background-position: 0% 100%}
  50% {background-position: 100% 0%}
  100% {background-position: 0% 100%}
}
</style>