<template>
    <div class="test">
        <button type="button" @click="showText">텍스트 보기</button>
        <button type="button" @click="showNumber">숫자 보기</button>
        <button type="button" @click="showMix">혼합 보기</button>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const num = 1234, str = 'test'

const showText = () => {
    console.log('showText')
    emit('showText', 'test')
}

const showNumber = () => {
    console.log('showNumber')
    emit('showNumber', 1234)
}

const showMix = () => {
    console.log('showMix')
    emit('showMix', `${num}${str}`)
}
</script>