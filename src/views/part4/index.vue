<template>
    <h1 class="mb-5">Part.4 컴포넌트</h1>

    <p>
        <text-field v-model="text" @input="modelTest" @update:modelValue="modelTest" />
        <btn id="btnClick" text="눌러봐" type="success" icon="fas fa-times" @click="clickTest" />
    </p>
    <p>
        <number-format v-model:num="num" v-model:numFormat="numFormat" />
    </p>
</template>

<script setup>
import { ref } from 'vue'
import btn from '@/components/btn'
import textField from '@/components/textField'
import numberFormat from '@/components/numberFormat'

let text = ref('')
let num = ref(0)
let numFormat = ref('0')

function clickTest(evt) {
    console.log(evt)
}

function clickCheck(v) {
    console.log(v)
}

function modelTest(v) {
    console.log('modelTest', v)
}
</script>