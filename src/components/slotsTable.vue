<template>
    <table :width="width" class="table table-dark table-striped">
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
import { defineProps } from 'vue'

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
</script>