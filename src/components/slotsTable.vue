<template>
    <table :width="width" class="table table-dark table-striped" @click="getComponent">
        <colgroup>
        </colgroup>
        <thead>
            <slot name="head"></slot>
        </thead>
        <tbody>
            <slot></slot>
        </tbody>
        <tfoot>
            <slot name="foot"></slot>
        </tfoot>
    </table>
</template>

<script setup>
import { useSlots, render, h, onMounted, defineProps, defineExpose, getCurrentInstance } from 'vue'

const app = getCurrentInstance()
const slots = useSlots()

const props = defineProps({
    width: {
        type: String,
        default: '100%'
    },
    list: {
        type: Array,
        default: [],
    },
    expose: {
        type: Array,
        default: [],
    }
})

const getComponent = () => {
    console.log(app)
}

defineExpose({
    getComponent
})
</script>