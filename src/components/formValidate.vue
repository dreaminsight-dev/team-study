<template>
    <form ref="frm" @submit.prevent>
        <slot></slot>
    </form>
</template>

<script setup>
import { useSlots, defineExpose, getCurrentInstance } from 'vue'

const ins = getCurrentInstance()
const slots = useSlots()

let checkState = true
let firstElm = null

const validate = () => {
    checkState = true
    firstElm = null

    traverse(ins.subTree)

    // 검수에 통과하지 못한 가장 첫번째 폼에 포커스
    if (firstElm !== null) {
        try {
            firstElm.scrollIntoView({behavior: 'smooth', block: 'center'})
        } catch(e) {}
    }

    return checkState
}

const resetForm = () => {
    traverse(ins.subTree, 'reset')
}

const traverse = (el, flag = 'dom') => {
    componentCheck(el, flag)

    const len = el.children.length

    if (len > 0) {
        const vueNodes = el.children

        // vue node 전체(chilren)을 탐색 하여 chidren이 또 있는 경우 재귀한다.
        for (let i = 0; i < len; i++) {
            if (!!vueNodes[i].children) {
                if (vueNodes[i].children.length > 0) {
                    traverse(vueNodes[i], flag)
                }
            } else {
                componentCheck(vueNodes[i], flag)
            }
        }
    }
}

const componentCheck = async (el, flag) => {
    const vueDom = [
        'inputField', 'numberFormat', 'selectBox', 'switchButton', 'checkButton',
        'orgSelect', 'datePicker', 'findPostCode', 'attachFile'
    ]

    // 컴포넌트인지 체크 후 필요한 처리를 한다.
    if (typeof el.type == 'object') {
        let file = el.type.__file.split('/')
        let tagName = file[file.length - 1].split('.')[0]

        if (vueDom.indexOf(tagName) > -1) {
            if (flag == 'reset') {
                el.component.exposed.resetForm()
            } else {
                if (!el.component.exposed.check() && checkState) {
                    checkState = false

                    // 가장 처음 검수에 통과 하지 못한 폼 저장 (라인 포커스)
                    if (firstElm === null) {
                        firstElm = el.$el
                    }
                }
            }
        }
    }
}

defineExpose({
    resetForm,
    validate
})
</script>