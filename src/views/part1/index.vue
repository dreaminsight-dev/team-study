<template>
    <h1>Part.1 기존형태 (Vue 2.x)</h1>
    <ul>
        <template v-for="num in list" :key="num">
            <li>{{num}}</li>
        </template>
    </ul>

    <p class="number" ref="num">{{num}}</p>

    <p>
        <a href="#" class="btn btn-secondary" @click.prevent="shuffle">번호 섞기</a>
        &nbsp;
        <a href="#" class="btn btn-primary" @click.prevent="change">변화보기</a>
    </p>
</template>

<script>
export default {
    data() {
        return {
            list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            num: 0
        }
    },
    beforeCreate() {
        console.log('beforeCreate')
    },
    created() {
        console.log('created')
    },
    beforeMount() {
        console.log('beforeMount')
    },
    mounted() {
        console.log('mounted')
    },
    beforeUpdate() {
        console.log('beforeUpdate', this.num)
        // console.log('beforeUpdate', parseInt(this.$refs.num.innerText))
    },
    updated() {
        console.log('updated', this.num)
    },
    beforeUnmount() {
        console.log('beforeUmount')
    },
    unmounted() {
        console.log('unmounted')
    },
    methods: {
        shuffle() {
            let before = null, after = null

            for (let i = 0; i < 10; i++) {
                let rnd = Math.floor(Math.random(0, this.list.length - 1) * 10)

                before = this.list[i]
                after = this.list[rnd]
                this.list[i] = after
                this.list[rnd] = before
            }

            this.num++

            console.log(document.querySelector('.number').textContent)

            this.$nextTick(() => {
                console.log('nextTick')
                console.log(document.querySelector('.number').textContent)
            })
        },
        change() {
            this.num++
        }
    }
}
</script>

<style scoped>
button {margin-right: 15px;}
ul {margin-bottom: 15px;}
</style>