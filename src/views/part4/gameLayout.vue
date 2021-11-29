<template>
    <div id="game">
        <div class="board">
            <div class="wrap-center">
                <transition-group :name="transType" class="wrap" tag="ul">
                    <li class="card" v-for="item in cards" :key="'card' + item.key">
                        <div :class="['item front', {open: item.isOpened}]">
                            <i class="fas fa-question" />
                        </div>
                        <div :class="['item back', {open: item.isOpened}, {pair: item.isPair}]">
                            <img :src="require(`@/assets/imgs/${item.img}-logo.png`)" />
                        </div>
                    </li>
                </transition-group>
            </div>

            <div class="score">
                도전 횟수: {{score}}
            </div>

            <div class="complete" v-if="scoreBoard">
                <div class="complete-board">
                    <p>총 도전 횟수: {{score}}</p>
                    <p>플레이 시간: {{completeTime}}</p>
                    <p class="my-0">
                        <slot-btn type="secondary" @click="close">닫기</slot-btn>&nbsp;
                        <slot-btn type="success" @click="restart">다시 시작하기</slot-btn>
                    </p>
                </div>
            </div>
        </div>

        <p>
            <slot-btn type="primary">시작하기</slot-btn>&nbsp;
            <slot-btn type="danger">취소하기</slot-btn>
        </p>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import slotBtn from '@/components/slotBtn'

const _ = require('lodash')
const util = inject('util')

const logos = ['vue', 'react', 'angular', 'nodejs', 'webpack', 'js']

let isStart = ref(false)
let isComplete = ref(false)
let cards = ref([])
let transType = ref('cards')
let openedCount = ref(0)
let openedIndex = ref([])
let score = ref(0)
let scoreBoard = ref(false)
let completeTime = ref('')

let pairCount = 0, startTime = 0, endTime = 0

for (let i = 0; i < 12; i++) {
    cards.value.push({img: logos[i % 6], isOpened: true, isPair: false, key: i})
}
</script>

<style scoped>
#game {text-align: center;}
#game .board {
    display: inline-block; width: 80vw; background-color: #000; padding: 25px 25px 0 25px; margin-bottom: 10px;
    background-image: url('../../assets/imgs/bg.jpg'); background-repeat: no-repeat; background-size: cover;
    background-position: center; text-align: center; position: relative;
}
#game .board .score {position: absolute; left: 20px; top: 10px; color: #fff; font-size: 30px; font-weight: 700}
#game .complete {
    position: absolute; width: 100%; height: 100%; left: 0; top: 0; background-color: rgba(0, 0, 0, .5);
    display: flex; flex-direction: row; align-items: center; justify-content: center;
}
#game .complete-board {width: 300px; background-color: #fff; border-radius: 20px; padding: 20px; font-size: 20px;}
#game .board .wrap-center {display: inline-block}
.wrap {
    width: 820px; height: 820px;
    display: flex; flex-wrap: wrap; flex-direction: row;
    justify-content: space-between;
    padding: 0; margin: 0; list-style: none;
}
.card {
    position: relative; width: 180px; height: 240px; perspective: 360px;
    border-radius: 10px; border: 0; background-color: transparent;
}
.card .item {border-radius: 10px; transition: all .5s ease-out; backface-visibility: hidden;}
.card .front {
    position: absolute; width: 100%; height: 100%; left: 0; top: 0; background-color: gold;
    color: #fff; font-size: 80px; display: flex; flex-direction: row; align-items: center; justify-content: center;
    box-sizing: border-box; transform: rotateY(0deg); box-shadow: 1px 2px 4px #000;
}
.card .front.open {transform: rotateY(180deg)}
.card .back {
    width: 100%; height: 100%; background-color: rgb(223, 223, 223); transform: rotateY(-180deg); overflow: hidden;
    display: flex; flex-direction: row; align-items: center; justify-content: center; box-sizing: border-box; box-shadow: 1px 2px 4px #000;
}
.card .back img {width: 70%; height: auto;}
.card .back.open {transform: rotateY(0deg)}
.card .back.pair {background-color: gold}

.cards-move {transition: transform .4s ease}
.cards-fast-move {transition: transform .2s ease}
</style>