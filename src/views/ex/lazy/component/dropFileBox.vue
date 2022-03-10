<template>
  <div class="upload-wrap">
    <div class="upload-close">
      <a href="#" @click.prevent="closeUpload"><i class="fa-solid fa-circle-xmark"></i></a>
    </div>
    <div class="drop-area"
      @dragover.prevent
      @dropenter.prevent
      @drop.prevent="fileDrop">
      <input type="file" multiple hiddne="true" @change="setFiles" />
      <div v-if="fileList.length == 0">업로드 할 파일을 올려 놓으세요.</div>
      <div v-else class="file-list">
        <div class="file-box" v-for="(item, i) in fileList" :key="`file-${i}`">
          <div class="file-box-img">
            <img :src="item.src" @load="loadComplete" v-show="isLoaded" />
          </div>
          <p class="file-box-name">{{ item.name }}</p>
        </div>
      </div>
      <transition name="fade">
        <div class="alert alert-danger" v-show="showAlert">파일은 최대 9개까지 등록 가능합니다.</div>
      </transition>
      <a href="#" class="btn btn-info" @click.prevent="uploading" v-if="fileList.length > 0">파일 업로드</a>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import axios from 'axios'

const emits = defineEmits(['close', 'reload'])
let uploadFiles = ref([])
let fileList = ref([])
let isLoaded = ref(false)
let showAlert = ref(false)

const loadComplete = () => {
  isLoaded.value = true
}

const fileDrop = (evt) => {
  addFiles(evt.dataTransfer.files)
}

const fileChange = (evt) => {
    addFiles(evt.target.files)
}

// 파일 미리 보기
const imagePreview = (file, index) => {
  const reader = new FileReader()

  reader.onload = (e) => {
    fileList.value[index].src = e.target.result
  }

  reader.readAsDataURL(file)
}

const addFiles = async (files) => {
  uploadFiles.value = []
  fileList.value = []

  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      if (i <= 8) {
        uploadFiles.value.push(files[i])
        fileList.value.push({
          src: '',
          name: files[i].name,
          size: files[i].size,
        })

        imagePreview(files[i], i)
      } else {
        showAlert.value = true

        setTimeout(() => {
          showAlert.value = false
        }, 3000)

        break
      }
    }
  }
}

const closeUpload = () => {
  emits('close')
}

const uploading = () => {
  if (uploadFiles.value.length > 0) {
    const data = new FormData()
    const cnt = uploadFiles.value.length

    for (let i = 0; i < cnt; i++) {
      data.append(`file${i + 1}`, uploadFiles.value[i])
    }

    data.append('fileCount', cnt)

    axios({
      url: 'https://studyapi.programrush.co.kr/study/fileUpload',
      headers: {'content-type': 'multipart/form-data'},
      method: 'post',
      data,
      onUploadProgress: (prog) => {
        console.log(prog)
        // 업로드 상황 표시
        // this.$set(this.fileList[index], 'uploaded', prog.loaded.toString().fileSize())
        // this.$set(this.fileList[index], 'uploadedPer', (prog.loaded / prog.total * 100).toFixed(1))
      }
    }).then(response => {
      const json = response.data

      if (json.result == 'success') {
        emits('reload')
      }
    })
  }
}
</script>

<style scoped>
.upload-wrap {
  z-index: 1000; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  box-sizing: border-box; padding: 15px; background-color: rgba(0, 0, 0, 0.5);
}
.upload-wrap .upload-close {z-index: 1001; position: absolute; right: 40px;}
.upload-wrap .upload-close a {text-decoration: none; color: gold; font-size: 30px;}
.upload-wrap .drop-area {
  position: relative; width: 100%; height: 100%; color: #fff; font-size: 30px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
}
.upload-wrap .drop-area input {position: absolute; left: -300%;}

.file-list {width: 100%; display: flex; flex-direction: row; flex-wrap: wrap;}
.file-list .file-box {margin: 10px; width: calc(33.3% - 20px); box-sizing: border-box; padding: 10px; background-color: #ffffffcc; border-radius: 5px;}
.file-list .file-box .file-box-img {width: 100%; height: 180px;}
.file-list .file-box .file-box-img img {width: 100%; height: 100%; border-radius: 5px;}
.file-list .file-box .file-box-name {font-size: 11px; color: #000; word-break: break-all; margin: 0; margin-top: 5px;}

.alert {font-size: 14px !important; width: 100%; text-align: center}
.fade-enter-from, .fade-leave-to {opacity: 0;}
.fade-enter-active, .fade-leave-active {transition: opacity 1s ease;}
</style>