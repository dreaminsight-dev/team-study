<template>
    <div>
        <table class="table table-grey table-striped">
            <tbody>
                <tr>
                    <th width="15%">제목</th>
                    <td><input type="text" class="form-control" ref="titleRef" placeholder="제목을 입력해주세요." v-model="title" /></td>
                </tr>
                <tr>
                    <th>작성자</th>
                    <td><input type="text" class="form-control" ref="userNameRef" placeholder="작성자 이름을 입력해주세요." v-model="userName" /></td>
                </tr>
                <tr>
                    <th>비밀번호</th>
                    <td><input type="password" class="form-control" ref="pwdRef" v-model="pwd" /></td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td><textarea ref="contentRef" class="form-control" rows="10" placeholder="내용을 입력해주세요." v-model="content" /></td>
                </tr>
            </tbody>
        </table>
        <div style="text-align: right">
            <a href="#" class="btn btn-secondary" @click.prevent="cancel">취소</a>
            &nbsp;
            <a href="#" class="btn btn-primary" @click.prevent="regist">등록</a>
        </div>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useStore } from 'vuex'

const vue = getCurrentInstance()

let title = ref('')
let userName = ref('')
let pwd = ref('')
let content = ref('')
const titleRef = ref()
const userNameRef = ref()
const pwdRef = ref()
const contentRef = ref()

const route = useRoute()
const router = useRouter()
const store = useStore()

const idx = parseInt(store.getters.getIdx)

const cancel = () => {
    vue.emit('writeClose')
}

const regist = () => {
    if (!title.value) {
        alert('제목을 입력해주세요.')
        titleRef.value.focus()
        return
    }

    if (!userName.value) {
        alert('작성자 명을 입력해주세요.')
        userNameRef.value.focus()
        return
    }

    if (pwd.value.length < 8) {
        alert('비밀번호는 8자리 이상 입력해주세요.')
        pwdRef.value.focus()
        return
    }

    if (!content.value) {
        alert('내용을 입력해주세요.')
        contentRef.value.focus()
        return
    }

    const form = new FormData()

    form.append('idx', idx)
    form.append('title', title.value)
    form.append('userName', userName.value)
    form.append('pwd', pwd.value)
    form.append('content', content.value)

    axios.post('https://studyapi.programrush.co.kr/study/setBoardWrite', form)
    .then(res => {
        const json = res.data

        if (json.result == 'success') {
            alert('저장 되었습니다.')
            router.go(-1)
        } else {
            console.log('뭔가 오류가 있어....')
        }
    })
}

const getDetail = () => {
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

console.log(route)

// 현제 기능이 수정페이지 라면
if (route.name == "ex/board/modify") {
    if (idx > 0) {
        getDetail()
    } else {
        router.back()
    }
}
</script>