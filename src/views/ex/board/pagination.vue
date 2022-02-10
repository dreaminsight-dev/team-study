<template>
    <!-- bootstrap pagination -->
    <nav :class="['page navigation', {inline: inline}]">
        <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#" @click.prevent="updateValue(1)"><i class="fas fa-angle-double-left" /></a></li>
            <li class="page-item"><a class="page-link" href="#" @click.prevent="updateValue(prev)"><i class="fas fa-angle-left" /></a></li>

            <li :class="['page-item', {active: v.num === nowPage}]" v-for="v in pageList" :key="`page-key-${v.num}`">
                <a class="page-link" href="#" @click.prevent="updateValue(v.num)">{{v.num}}</a>
            </li>

            <li class="page-item"><a class="page-link" href="#" @click.prevent="updateValue(next)"><i class="fas fa-angle-right" /></a></li>
            <li class="page-item"><a class="page-link" href="#" @click.prevent="updateValue(maxPage)"><i class="fas fa-angle-double-right" /></a></li>
        </ul>
    </nav>
</template>

<script setup>
import {ref, defineProps, watch, getCurrentInstance} from 'vue'

const ins = getCurrentInstance()
const props = defineProps({
    modelValue: [String, Number],
    size: [String, Number],         // 한 페이지 목록 사이즈
    block: [String, Number],        // 표시할 페이지 개수
    total: [String, Number],        // 전체 수량
    addClass: String,
    inline: {
        type: Boolean,
        default: false
    }
})

let pageList = ref([])
let nowPage = ref(1)
let maxPage = ref(1)
let pageBlock = ref(10)
let startPage = ref(1)
let endPage = ref(1)
let prev = ref(0)
let next = ref(0)

watch(() => props.total, (v) => {
    makePageList()
})

watch(() => props.size, (v) => {
    makePageList()
})

watch(() => props.block, (v) => {
    makePageList()
})

watch(() => props.modelValue, (v) => {
    if (nowPage.value != v && v > 0) {
        makePageList()
        nowPage.value = v
    }
})

const makePageList = () => {
    pageList.value = []
    maxPage.value = Math.ceil(props.total / props.size)
    startPage.value = Math.floor((nowPage.value - 1) / pageBlock.value) * pageBlock.value + 1
    endPage.value = ((startPage.value + pageBlock.value - 1) > maxPage.value) ? maxPage.value : (startPage.value + pageBlock.value - 1)

    if (endPage.value == 0) endPage.value = 1

    prev.value = (startPage.value - 1 > 0) ? startPage.value - 1 : 1
    next.value = (startPage.value + pageBlock.value <= maxPage.value) ? endPage.value + 1 : maxPage.value

    for (let i = startPage.value; i <= endPage.value; i++) {
        pageList.value.push({
            num: i,
            isOn: nowPage.value == i ? true : false
        })
    }
}

const updateValue = (v) => {
    if (parseInt(v) != nowPage) {
        nowPage.value = v
        ins.emit('update:modelValue', v)

        makePageList()
    }
}

if (props.block) {
    pageBlock.value = parseInt(props.block)
}

nowPage.value = props.modelValue
makePageList()
</script>

<style scoped>
.page-item.active .page-link {z-index: 0 !important;}
.page-item a {transition: all .2s;}
.pagination {margin-bottom: 0 !important}
</style>