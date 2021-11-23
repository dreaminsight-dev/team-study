<template>
    <h1>플러그인 (Plugin)</h1>
    <p>
        <button type="button" @click="showAlert">Alert 보기</button>
        <button type="button" @click="otherAlert">다른 Alert 보기</button>
    </p>
    <p>
        <input type="text" v-model="num"> -> {{numFormat}}
        <br>
        <br>
        <button type="button" @click="showPrototype">Prototype 확인</button>
    </p>
</template>

<script setup>
import { ref, inject, getCurrentInstance } from 'vue'

const vue = getCurrentInstance()
const util = inject('util')

let num = ref(0)
let numFormat = ref(0)

console.log(vue)

function showAlert() {
    util.alert('util.alert!')
}

function otherAlert() {
    alertModal('다른 얼럿')
}

const showPrototype = () => {
    if (parseInt(num.value) > 0) {
        numFormat.value = num.value.numberFormat()
    }
}
</script>

<style scoped>
button {margin-right: 15px;}
</style>