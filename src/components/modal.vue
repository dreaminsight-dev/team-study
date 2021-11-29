<template>
    <teleport to="body">
        <div class="modal-bg">
            <div class="popup">
                <div class="header">레이어 모달 팝업</div>
                <div class="body">
                    이곳에 내용이 들어가고
                </div>
                <div class="footer">
                    <a href="#" class="btn btn-secondary" @click.prevent="checkEmit">emit</a>
                    <a href="#" class="btn btn-secondary" @click.prevent="close">닫기</a>
                    <a href="#" class="btn btn-primary" @click.prevent="accept">확인</a>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['popupClose'])

const close = () => {
    emit('popupClose')
}

function accept() {
    emit('popupClose')
}

function checkEmit() {
    emit('update')
}
</script>

<style scoped>
.modal-bg {
    background-color: rgba(0, 0, 0, .5); width: 100vw; height: 100vh;
    position: fixed; left: 0; top: 0;
    display: flex; flex-direction: row; align-items: center; justify-content: center;
}
.modal-bg .popup {min-width: 500px; background-color: #fff; border-radius: 4px;}
.modal-bg .header {padding: 10px; font-size: 22px; font-weight: bold; border-bottom: 1px solid rgb(223, 223, 223);}
.modal-bg .body {padding: 15px; font-size: 14px; border-bottom: 1px solid rgb(223, 223, 223);}
.modal-bg .footer {padding: 10px; text-align: right;}
.modal-bg .footer .btn + .btn {margin-left: 5px;}
</style>