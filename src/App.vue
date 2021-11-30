<template>
    <div id="content">
        <ul>
            <li v-for="(item, i) in menu" :key="`menu${i}`">
                <a href="#" @click.prevent="menuToggle(i)">{{item.text}}</a>

                <dl v-show="item.subShow">
                    <dd v-for="(sub, j) in item.sub" :key="`sub-menu-${j}`">
                        <router-link :to="`${item.url}${sub.url}`">{{sub.text}}</router-link>
                    </dd>
                </dl>
            </li>
        </ul>

        <router-view />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const menu = ref([
    {text: 'Vue 2.x 비교', url: '/part1', subShow: false, sub: [
        {text: 'Vue 2.x 형태', url: ''},
        {text: 'Composition', url: '/setup'},
    ]},
    {text: 'Composition API', url: '/part2', subShow: false, sub: [
        {text: 'SFC setup', url: ''},
        {text: '반응형과 상태관리', url: '/variables'},
    ]},
    {text: 'Plugin & Component', url: '/part3', subShow: false, sub: [
        {text: 'Plugin', url: '/plugin'},
        {text: 'Component', url: '/component'},
        {text: 'Component with Plugin', url: '/pluginWithComponent'},
        {text: 'Slot', url: '/slot'},
    ]},
    {text: '숙달 과정', url: '/part4', subShow: false, sub: [
        {text: 'Component 더 깊이 보기', url: '/component'},
        {text: 'Transition', url: '/transition'},
        {text: 'Game', url: '/gameLayout'},
    ]},
])
let onIndex = -1

watch(route, (a, b) => {
    if (onIndex > -1) {
        menu.value[onIndex].subShow = !menu.value[onIndex].subShow
    }
})

const menuToggle = (index) => {
    if (onIndex > -1 && onIndex != index) {
        menu.value[onIndex].subShow = false
    }

    menu.value[index].subShow = !menu.value[index].subShow
    onIndex = index
}
</script>


<style scoped>
#content {padding: 20px;}
ul {list-style: none; display: flex; flex-direction: row; position: relative; z-index: 100;}
ul li {
    text-align: center; border: 1px solid rgb(145, 145, 145);
    height: 40px; box-sizing: border-box; width: 190px; position: relative;
}
ul li:not(:first-child) {border-left: 0px !important;}
ul li a {display: block; width: 100%; height: 100%; line-height: 38px;}
ul li dl {position: absolute; left: -1px; list-style: none; margin: 0; padding: 0; width: calc(100% + 2px);}
ul li dl dd {border: 1px solid #000; margin: 0; width: 100%; background-color: #fff;}
ul li dl dd:not(:first-child) {border-top: 0px !important;}
a {text-decoration: none; color: #000;}
</style>