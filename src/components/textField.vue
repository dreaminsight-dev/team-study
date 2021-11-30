<template>
    <span>
        <input type="text" class="form-control" :value="modelValue" @input="updateValue" />
    </span>
</template>

<script setup>
import { defineEmits, defineProps, getCurrentInstance } from 'vue'

const app = getCurrentInstance()
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: [String, Number],
    name: String,
})

function updateValue(evt) {
    emit('update:modelValue', evt.target.value)
}

function focus() {
    console.log(app)
    app.ctx.$el.querySelector('input').focus()
}

import { defineExpose } from 'vue'

defineExpose({
    focus
})
</script>

<style scoped>
input {display: inline-block !important; width: 200px; margin-right: 5px;}
</style>