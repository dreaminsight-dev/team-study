<template>
    <h1>Part.1 Setup (Vue 3.x)</h1>
    <ul>
        <template v-for="num in list" :key="num">
            <li>{{num}}</li>
        </template>
    </ul>

    <p>{{num}}</p>

    <p>
        <button type="button" @click="shuffle">번호 섞기</button>
        <button type="button" @click="change">변화 보기</button>
    </p>
</template>

<script>
import {
    ref,
    onBeforeMount, onMounted,
    onBeforeUpdate, onUpdated,
    onBeforeUnmount, onUnmounted,
    nextTick
} from 'vue'

export default {
    setup(props, context) {
        let list = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        let num = 0

        onBeforeMount(() => {
            console.log('onBeforeMount')
        })

        onMounted(() => {
            console.log('onMounted')
        })

        onBeforeUpdate(() => {
            console.log('onBeforeUpdate')
        })

        onUpdated(() => {
            console.log('onUpdated')
        })

        onBeforeUnmount(() => {
            console.log('onBeforeUnmount')
        })

        onUnmounted(() => {
            console.log('onUnmounted')
        })

        console.log('setup')

        const shuffle = () => {
            let before = null, after = null

            for (let i = 0; i < 10; i++) {
                let rnd = Math.floor(Math.random(0, list.value.length - 1) * 10)

                before = list.value[i]
                after = list.value[rnd]
                list.value[i] = after
                list.value[rnd] = before
            }

            nextTick(() => {
                console.log('nextTick')
            })
        }

        const change = () => {
            num++
        }

        return {
            list,
            num,
            shuffle,
            change
        }
    },
}
</script>

<style scoped>
button {margin-right: 15px;}
ul {margin-bottom: 15px;}
</style>