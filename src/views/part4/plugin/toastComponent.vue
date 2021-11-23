<template>
    <div id="toast" v-if="bgShow">
        <transition-group appear name="toast-view" @after-leave="checkToast">
            <div
                :class="'toast-body ' + (v.color != '' ? 'bg-' + v.color : '')"
                v-for="(v, i) in list" :key="'toast-' + v.key"
                @click="hide(i)">
                <i v-if="v.icon != ''" :class="'fas fa-' + v.icon" />
                <span class="message">{{v.message}}</span>
            </div>
        </transition-group>
    </div>
</template>

<script setup>
import { ref, defineProps, defineExpose } from 'vue'

const props = defineProps({
    message: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: 'check-circle',
    },
    delay: {
        type: [Number, String],
        defalt: 3000,
    },
    color: {
        type: String,
        default: 'success'
    },
})

let bgShow = ref(false)
let list = ref([])
let timeout = ref([])
let messageLimit = 4
let key = 0

const show = () => {
    bgShow.value = true

    list.value.push({
        key: key,
        color: props.color,
        message: props.message,
        icon: props.icon
    })

    // 표시 시간이 지나면 자동으로 메시지 삭제
    timeout.value.push(setTimeout(() => {
        hide(0)
    }, props.delay))

    key++

    let len = list.value.length

    if (len > messageLimit) {
        hide(0)
    }
}

const hide = (index = 0) => {
    try {
        clearTimeout(timeout.value[list.value[index].key])

        if (list.value.length > 0) {
            list.value.splice(index, 1)
        }
    } catch {}
}

const checkToast = () => {
    if (list.value.length <= 0) {
        key = 0
        timeout.value = []
        bgShow.value = false
    }
}

defineExpose({
    show, hide
})
</script>

<style scoped>
#toast {
    position: fixed; bottom: 0; z-index: 100000; width: 100%; background-color: transparent;
    display: inline-flex; flex-direction: column; align-items: center;
}
.toast-body {
    margin: 5px 0; height: 55px; padding: 0 25px 0 15px; min-width: 400px; border-radius: 5px; box-sizing: border-box;
    display: flex; flex-direction: row; align-items: center; justify-content: left;
}
.toast-body.bg-success {border-left: 6px solid #3a863c;}
.toast-body.bg-primary {border-left: 6px solid #0b3e79;}
.toast-body.bg-info {border-left: 6px solid #1a74be;}
.toast-body.bg-warning {border-left: 6px solid #cc7000;}
.toast-body.bg-error {border-left: 6px solid #b33a3a;}
.toast-body i {display: block; margin-right: 10px; font-size: 24px;}
.toast-body .message {font-size: 14px;}

.success {color: #4caf50 !important;}
.primary {color: #1867c0 !important;}
.info {color: #2196f3 !important;}
.warning {color: #fb8c00 !important;}
.error {color: #ff5252 !important;}

.bg-success {background-color: #4caf50 !important; color: #fff;}
.bg-primary {background-color: #1867c0 !important; color: #fff;}
.bg-info {background-color: #2196f3 !important; color: #fff;}
.bg-warning {background-color: #fb8c00 !important; color: #fff;}
.bg-error {background-color: #ff5252 !important; color: #fff;}

.toast-view-enter-from {margin-bottom: -60px; opacity: 0;}
.toast-view-leave-to {transform: scale(0); opacity: 0;}
.toast-view-leave-active, .toast-view-enter-active {transition: all .2s ease-out;}
</style>