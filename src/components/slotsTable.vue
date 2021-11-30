<template>
    <table :width="width" class="table table-dark table-striped" @click="getComponent">
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
import { defineProps, defineExpose, getCurrentInstance } from 'vue'

const app = getCurrentInstance()

const props = defineProps({
    width: {
        type: String,
        default: '100%'
    },
    list: {
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