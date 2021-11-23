<template>
    <span>
        <a href="#" :id="attrs.id" :class="[`btn btn-${type}`]">
            {{text}}
        </a>
    </span>
</template>

<script setup>
import { useAttrs, defineProps, defineEmits } from 'vue'

// 기존 props 와 똑같은 기능 수행
const props = defineProps({
    text: {
        type: String,
        default: '눌러봐!'
    },
    tag: {
        type: String,
        default: 'a'
    },
    type: {
        type: String,
        default: 'primary'
    }
})

// 기존 props 외의 attribute에 대해서는 루트 테그에 바인딩 되었지만
// useAttrs 를 이용하여 원하는 위치에 attribute를 지정 할 수 있다.
const attrs = useAttrs()

// defineEmits을 지정할 경우 부모쪽에서 전달된 이벤트를 무시하고 컴포넌트에 지정된 이벤트를 수행
// 부모쪽에서 지정된 이벤트와 자식 이벤트가 중복 될 경우 버블 발생
// const emits = defineEmits(['click'])

// function btnClick() {
//     emits('click', 'btn-click test')
// }
</script>