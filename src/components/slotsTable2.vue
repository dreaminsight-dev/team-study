<template>
    <table :class="['table table-striped', {'table-dark': props.dark}]" @click="emit('table-click')">
        <colgroup>
            <col v-if="checkAll" width="50" />
            <col v-for="item in tableHeader"
                :key="'col' + item.text"
                :width="(item.width ? item.width : '')" />
        </colgroup>
        <thead>
            <tr>
                <th v-if="checkAll">
                    <input type="checkbox" ref="listTableCheck" @click="checkAllEvent" />
                </th>
                <th v-for="(item, i) in tableHeader" :key="'head' + item.text">
                    {{item.text}}
                    <button
                        type="button" class="btn setSort"
                        v-if="item.sort"
                        @click="sortingField(item.target, item.order, i)">
                        <i :class="['demo-icon', item.order == 'desc' ? 'icon-down' : 'icon-up']" />
                    </button>
                </th>
            </tr>
        </thead>

        <tbody v-if="items.length > 0">
            <slot v-for="(item, index) in props.items" :item="item" :index="index"></slot>
        </tbody>
        <tbody v-else>
            <tr>
                <td class="no-data" :colspan="colspan">
                    <div>{{noDataText}}</div>
                </td>
            </tr>
        </tbody>

        <tfoot v-if="props.footer.length > 0">
            <tr>
                <th v-for="(item, i) in props.footer" :key="`footer${i}`">
                    {{item.text}}
                </th>
            </tr>
        </tfoot>
        <tfoot v-else-if="footerSlot">

            <slot name="footer"></slot>
        </tfoot>
    </table>
</template>

<script setup>
import {ref, watch, useSlots, defineProps, defineEmits, onMounted } from 'vue'

const props = defineProps({
    header: {                       // 목록 최상단 라벨링 Array:[{text: string, width: int, sort: boolean, target: string(sort target)}] *
        type: Array,
        default: []
    },
    items: {                        // 테이블 목록 Array:[] *
        type: Array,
        required: true
    },
    emptyText: String,              // 목록이 없을 경우 표시할 텍스트 String:''
    width: {
        type: String,
        default: ''
    },
    checkAll: {                     // 리스트 체크 여부 Boolean:false
        type: Boolean,
        default: false
    },
    footer: {
        type: Array,
        default: [],
    },
    dark: {
        type: Boolean,
        default: false,
    }
})
const emit = defineEmits(['checked', 'sort-change', 'table-click'])
const slots = useSlots()

const listTableCheck = ref(null)
let checked = ref(false),
    colspan = ref(0),
    noDataText = ref('데이터가 없습니다.'),
    tableHeader = ref([]),
    footerSlot = ref(typeof slots.footer == 'function')

watch(() => props.header, () => {
    setHeader()
})

watch(() => props.items, () => {
    if (props.checkAll) {
        listTableCheck.checked = false
    }
})

const setHeader = () => {
    if (props.header.length > 0) {
        tableHeader.value = props.header.map(obj => {
            return {
                ...obj,
                order: 'desc'
            }
        })
    }
}

const checkAllEvent = (evt) => {
    emit('checked', evt.target.checked)
}

const sortingField = (target, order, index) => {
    tableHeader.value[index].order = (order === 'desc') ? 'asc' : 'desc'
    emit('sort-change', target, (order === 'desc') ? 'asc' : 'desc')
}

setHeader()

colspan.value = props.header.length + (props.checkAll ? 1 : 0)

if (props.emptyText) {
    noDataText.value = props.emptyText
}

onMounted(() => {
})
</script>

<style scoped>
.no-data {text-align: center; height: 100px;}
thead input[type=checkbox] {vertical-align: middle;}
tbody input[type=checkbox] {vertical-align: middle;}
</style>