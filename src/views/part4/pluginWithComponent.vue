<template>
    <h1>Part.4 Plugin with Component</h1>

    <p>
        <slot-btn type="success" @click="showToast">토스트 메시지 보기</slot-btn>
    </p>
</template>

<script setup>
import { inject } from 'vue'
import slotBtn from '@/components/slotBtn'

const toast = inject('toast')

function showToast() {
    toast('토스트 메시지가 보입니다.')
}
</script>