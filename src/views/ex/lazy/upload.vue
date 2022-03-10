<template>
  <div>
    <input type="file" @change="changeUploadFile" />
    <a href="#" class="btn btn-primary" @click.prevent="upload"> 파일 업로드</a>

    <div>
      <div><img :src="originImg" v-if="originImg" /></div>
      <div><img :src="lazyImg" v-if="lazyImg" /></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

let files = []
let originImg = ref('')
let lazyImg = ref('')

const changeUploadFile = (evt) => {
  if (evt.target.files.length > 0) {
    files = evt.target.files
  } else {
    files = []
  }
}

const upload = async () => {
  const data = new FormData()

  for (let i = 0; i < files.length; i++) {
    data.append(`file${i}`, files[i])
  }

  const { result, fileName } = await axios.post(
    'https://studyapi.programrush.co.kr/study/fileUpload',
    data,
    {
      headers: {'Content-type': 'multipart/form-data'}
    }
  ).then(res => res.data)

  if (result == 'success') {
    originImg.value = `https://studyapi.programrush.co.kr/upload/${fileName}`
    lazyImg.value = `https://studyapi.programrush.co.kr/upload/lazy/${fileName}`
  }
}
</script>

<style>
img {max-width: 100%;}
</style>