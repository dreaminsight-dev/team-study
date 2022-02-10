<template>
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

    <div class="popup" v-show="popupShow">
        <div class="popup-wrap">
            <h5>비밀번호 확인</h5>
            <div class="popup-body">
                <input ref="pwdRef" type="password" class="form-control" v-model="pwd">
            </div>
            <div class="popup-foot">
                <a href="#" class="btn btn-secondary" @click.prevent="closePopup">취소</a>
                &nbsp;
                <a href="#" class="btn btn-primary" @click.prevent="getPwdCheck">확인</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import axios from 'axios'

const props = defineProps({
    idx: {
        type: Number,
        required: true
    }
})

const emit = defineEmits()

let title = ref('')
let userName = ref('')
let content = ref('')
let popupShow = ref(false)
let pwd = ref('')
let flag = ref('')
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
    popupShow.value = true
    flag.value = f

    setTimeout(() => {
        pwdRef.value.focus()
    }, 10)
    console.log(pwdRef.value)
}

const getPwdCheck = async () => {
    if (!pwd.value) {
        alert('비밀번호를 입력해주세요.')
        return
    }

    const idx = props.idx

    const response = await axios.get(`https://studyapi.programrush.co.kr/study/getBoardPwdCheck?idx=${idx}&pwd=${pwd.value}`)
    let { result } = response.data

    if (result == 'success') {
        if (flag.value == 'delete') {
            const form = new FormData()

            form.append('idx', idx)
            form.append('pwd', pwd.value)

            const res = await axios.post('https://studyapi.programrush.co.kr/study/setBoardDelete', form)

            const { result } = res.data

            if (result == 'success') {
                alert('게시물이 삭제 되었습니다.')
            }
        }
    } else {
        alert('비밀번호를 확인해주세요.')
    }
}

const cancel = () => {
    emit('detailClose')
}

const closePopup = () => {
    popupShow.value = false
}

getDetail()
</script>

<style scoped>
.popup {
    position: fixed; width: 100%; height: 100%; background-color: rgba(0, 0, 0, .5);
    top: 0; left: 0; display: flex; flex-direction: row; align-items: center; justify-content: center
}
.popup-wrap {background-color: #fff; width: 300px; border-radius: 10px; overflow: hidden;}
.popup-wrap h5 {background-color: rgb(121, 121, 121); color: #fff; padding: 15px}
.popup-body {padding: 15px;}
.popup-foot {padding: 15px; text-align: right; border-top: 1px solid rgb(121, 121, 121)}
</style>