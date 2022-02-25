<template>
    <transition appear name="slide-up" @after-leave="emit('detailClose')">
        <div class="detail-wrap" v-show="popupShow">
            <table class="table table-grey table-striped">
                <tbody>
                    <tr>
                        <th width="15%">제목</th>
                        <td>{{title}}</td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td>{{userName}}</td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td v-html="content.replace(/\n/gi, '<br>')"></td>
                    </tr>
                </tbody>
            </table>
            <div style="text-align: right">
                <a href="#" class="btn btn-secondary" @click.prevent="cancel">취소</a>&nbsp;
                <a href="#" class="btn btn-danger" @click.prevent="checkPwd('delete')">삭제</a>&nbsp;
                <a href="#" class="btn btn-info" @click.prevent="checkPwd()">수정</a>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const props = defineProps({
    idx: {
        type: Number,
        required: true
    }
})
const router = useRouter()
const emit = defineEmits(['detailClose'])

let title = ref('')
let userName = ref('')
let content = ref('')
let flag = ref('')
let popupShow = ref(true)
const pwdRef = ref()

const getDetail = () => {
    const idx = props.idx

    axios.get(`https://studyapi.programrush.co.kr/study/getBoardDetail?idx=${idx}`)
    .then(res => {
        const json = res.data

        if (json.result == 'success') {
            title.value = json.data.title
            userName.value = json.data.userName
            content.value = json.data.content
        }
    })
}

const checkPwd = (f) => {
    flag.value = f

    setTimeout(() => {
        pwdRef.value.focus()
    }, 10)
}

const cancel = () => {
    popupShow.value = false
    router.push('/ex/board')
}

getDetail()
</script>

<style scoped>
.detail-wrap {position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 100; padding: 15px; background-color: #fff;}

.slide-up-enter-from, .slide-up-leave-to {transform: translateY(100%)}
.slide-up-enter-active, .slide-up-leave-active {transition: transform .3s;}
</style>