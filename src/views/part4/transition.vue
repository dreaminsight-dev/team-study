<template>
    <div class="flex">
        <section>
            <h1>Basic transition</h1>
            <div class="wrap">
                <transition name="scale">
                    <div class="box" v-show="show"><span>1</span></div>
                </transition>
            </div>
            <slot-btn type="success" @click="action">토글</slot-btn>
        </section>
        <section>
            <h1>Animation transition</h1>
            <div class="wrap">
                <transition name="ani">
                    <div class="ani-box" v-show="show2" @click="show2 = false"><span>2</span></div>
                </transition>
            </div>
            <slot-btn type="danger" @click="action2">토글</slot-btn>
        </section>
        <section>
            <h1>List transition</h1>
            <transition-group :name="transType" class="wrap2" tag="ul">
                <li class="box-small" v-for="(num, i) in list" :key="`${num}`" @click="changeOne(i)">{{num}}</li>
            </transition-group>
            <slot-btn type="info" @click="shuffle">순서 한꺼번에 바꾸기</slot-btn>&nbsp;
            <slot-btn type="primary" @click="otherChange">순서 하나씩 바꾸기</slot-btn>
        </section>
        <section>
            <h1>Transition hook</h1>

            <teleport to="body">
                <component :is="popup" @popupClose="closePopup" />
            </teleport>

            <p><slot-btn type="warning" @click="showModal">모달 창 보기</slot-btn></p>
        </section>
    </div>
</template>

<script setup>
import { ref, inject, markRaw,  } from 'vue'
import slotBtn from '@/components/slotBtn'
import modal from '@/components/modal2'

const util = inject('util')
const _ = require('lodash')

let show = ref(true),
    show2 = ref(true),
    list = ref([]),
    popup = ref(null),
    transType = ref('list')

for (let i = 1; i < 10; i++) {
    list.value.push(i)
}

const delay = async (time) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

const action = () => {
    show.value = !show.value
}

const action2 = () => {
    show2.value = !show2.value
}

const shuffle = () => {
    transType.value = 'list'
    list.value = _.shuffle(list.value)
}

const changeOne = (index) => {
    let num = list.value[index]
    let changeIndex = -1

    do {
        changeIndex = _.random(0, 8)
    } while (changeIndex == index)

    let changeNum = list.value[changeIndex]

    list.value[index] = changeNum
    list.value[changeIndex] = num
}

const otherChange = async () => {
    transType.value = 'list-fast'

    for (let i = 0; i < list.value.length; i++) {
        changeOne(i)
        await util.delay(220)
    }
}

const showModal = () => {
    popup.value = markRaw(modal)
}

const closePopup = () => {
    popup.value = null
}
</script>

<style>
section {width: 50%; display: inline-block; margin-bottom: 20px;}
.wrap {width: 300px; height: 300px; margin-bottom: 10px;}
.box {border: 1px solid #000; box-sizing: border-box; width: 300px; height: 300px; display: flex; flex-direction: row;  align-items: center; justify-content: center; font-size: 100px;}
.ani-box {
    box-sizing: border-box; width: 300px; height: 300px;
    display: flex; flex-direction: row;  align-items: center; justify-content: center;
    background-color: rgb(74, 110, 211); color: #fff; font-size: 100px;
}
.ani-enter-active {animation: bounce .5s}
.ani-leave-active {animation: bounce .5s reverse;}
@keyframes bounce {
    0% {transform: scale(0); background-color: rgb(202, 47, 47);}
    80% {transform: scale(1.3)}
    100% {transform: scale(1);}
}
.wrap2 {
    width: 360px; height: 360px; margin-bottom: 10px;
    display: flex; flex-wrap: wrap; flex-direction: row;
    align-items: baseline; justify-content: space-between;
    padding: 0; margin: 0; list-style: none;
}
.box-small {width: 100px; height: 100px; border: 1px solid #000; display: flex; align-items: center; justify-content: center; transition: transform .2s ease}
.box-small:hover {transform: scale(1.2)}
.box-small:first-child {margin: 0;}
.scale-enter-from,
.scale-leave-to {
    transform: scale(0.5);
    opacity: 0;
}
.scale-enter-active,
.scale-leave-active {
    transition: all 0.3s ease;
}
.list-move {transition: transform .5s ease}
.list-fast-move {transition: transform .2s ease}
</style>