<template>
    <h1 class="mb-5">Part.3 컴포넌트</h1>

    <p style="display: flex; flex-direction: row; align-items: center;">
        <text-field ref="input" v-model="text" @input="modelTest" />
        <btn tag="button" id="btnClick" type="success" icon="fas fa-times" text="clear" @click="clickTest" />
    </p>
    <p>
        <number-format v-model:num="num" v-model:numFormat="numFormat" />
    </p>

    <p>
        <keep-alive>
            <info v-if="showInfo" />
        </keep-alive>
        <btn text="안내문 보기" type="success" @click="toggleInfo" />
    </p>

    <p>
        <component :is="popup" @popupClose="closePopup" />
        <btn type="info" text="동적 컴포넌트 보기" @click="viewModal" />
    </p>
</template>

<script setup>
import { ref, markRaw } from 'vue'
import btn from '@/components/btn'
import textField from '@/components/textField'
import numberFormat from '@/components/numberFormat'
import modal from '@/components/modal'
import info from '@/components/info'

let text = ref('')
let num = ref(0)
let numFormat = ref('0')
let input = ref(null)
let popup = ref(null)
let showInfo = ref(false)

function clickTest(evt) {
    text.value = ''
    console.log(input)
    input.value.focus()
}

function clickCheck(v) {
    console.log(v)
}

function modelTest(v) {
    console.log('modelTest', v)
}

const viewModal = () => {
    popup.value = markRaw(modal)
    console.log(popup)
}

const closePopup = () => {
    popup.value = null
}

const toggleInfo = () => {
    showInfo.value = !showInfo.value
}
</script>