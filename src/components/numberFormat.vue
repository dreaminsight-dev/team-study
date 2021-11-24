<template>
    <input type="text" class="form-control" :value="numFormat" @input="updateValue" @blur="valueCheck" @focus="valueCheck" />
</template>

<script setup>
import { defineProps, defineEmits, getCurrentInstance } from 'vue'

const app = getCurrentInstance()
const props = defineProps({
    num: {
        type: Number,
        required: true,
    },
    numFormat: {
        type: String,
        default: '0'
    },
    name: String,
})

function updateValue(evt) {
    app.emit('update:numFormat', format(evt.target.value))

    let num = parseInt(evt.target.value.replace(/,/ig, ''))

    if (isNaN(num)) {
        num = 0
    }

    app.emit('update:num', num)
}

const valueCheck = (evt) => {
    if (evt.type == 'focus') {
        if (props.numFormat == '0') {
            app.emit('update:numFormat', '')
        }
    } else if (evt.type == 'blur') {
        if (props.numFormat == '') {
            app.emit('update:numFormat', '0')
        }
    }
}

const format = (v) => {
    if (v !== '') {
        let minus = parseInt(v) >= 0 ? false : true
        let find = /(\d+)(\d{3})/
        let spNum = v.toString().split('.')
        let num = parseInt(spNum[0].replace(/[^0-9]/g, '')).toString()

        while (find.test(num)) {
            num = num.replace(find, '$1' + ',' + '$2')
        }

        if (minus) {
            num = '-' + num
        }

        return num
    }

    return ''
}
</script>

<style scoped>
input {display: inline-block !important; width: 200px; margin-right: 5px; text-align: right;}
</style>