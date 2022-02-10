<template>
    <div class="wrap">
        <detail :idx="idx" @detailClose="detailClose" v-if="pageMode == 'detail'" />
        <write :idx="idx" @writeClose="writeClose" v-else-if="pageMode == 'write'" />
        <template v-else>
            <table class="table table-secondary table-striped">
                <thead>
                    <tr>
                        <td width="80">No.</td>
                        <td width="">제목</td>
                        <td width="100">작성자</td>
                        <td width="150">등록일</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in list" :key="`list-${i}`">
                        <td>{{item.idx}}</td>
                        <td><a href="#" @click.prevent="showDetail(item.idx)">{{item.title}}</a></td>
                        <td>{{item.userName}}</td>
                        <td>{{item.regDate.substr(0, 10)}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="board-bottom">
                <pagination :size="pageSize" :total="total" :block="pageBlock" v-model="page" />

                <div>
                    <a href="#" class="btn btn-primary" @click.prevent="showWrite">작성</a>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import router from '@/router'
import axios from 'axios'
import pagination from './pagination'
import detail from './detail'
import write from './write'

let idx = ref(0)
let pageWriteMode = ref('')
let list = ref([])
let page = ref(1)
let pageSize = ref(10)
let total = ref(0)
let pageBlock = ref(10)
let totalPage = ref(0)
let pagingView = ref(0)

watch(page, () => {
    getList()
})

const pageMode = computed(() => {
    if (pageWriteMode.value) {
        return 'write'
    } else if (idx.value > 0) {
        return 'detail'
    }

    return 'list'
})

const showWrite = () => {
    pageWriteMode.value = 'write'
}

const writeClose = () => {
    pageWriteMode.value = ''
}

const showDetail = (num) => {
    idx.value = num
}

const detailClose = () => {
    idx.value = 0
}

const getList = () => {
    axios.get(`https://studyapi.programrush.co.kr/study/getBoardList?page=${page.value}&pageSize=${pageSize.value}`)
    .then(res => {
        const json = res.data

        if (json.result == 'success') {
            total.value = parseInt(json.total)
            list.value = json.data
        }
    })
}

getList()
</script>

<style scoped>
.board-bottom {width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between}
</style>