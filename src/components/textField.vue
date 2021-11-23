<template>
    <span>
        <input type="text" class="form-control" :value="modelValue" @input="updateValue" />
    </span>
</template>

<script setup>
import { defineProps, defineEmits, getCurrentInstance } from 'vue'

const app = getCurrentInstance()
const props = defineProps({
    modelValue: [String, Number],
    name: String,
})

const emits = defineEmits(['input'])

function updateValue(evt) {
    emits('update:modelValue', evt.target.value)
}
</script>

<style scoped>
input {display: inline-block !important; width: 200px; margin-right: 5px;}
</style>