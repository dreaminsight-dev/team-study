<template>
    <section>
        <h1>기본 트랜지션</h1>
        <div class="wrap">
            <transition appear name="scale">
                <div class="box" v-show="show"><span>1</span></div>
            </transition>
        </div>
        <button type="button" @click="action">토글</button>
    </section>
    <section>
        <h1>리스트 트랜지션</h1>
        <transition-group name="list" class="wrap2" tag="ul">
            <li class="box-small" v-for="i in list" :key="`${i}`">{{i}}</li>
        </transition-group>
        <button type="button" @click="shuffle">순서 바꾸기</button>
    </section>
</template>

<script>
import { ref, getCurrentInstance, defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            quest: 'quest'
        }
    },
    setup(props, {attrs, emit, slots, expose}) {
        let show = ref(true),
            list = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

        const action = () => {
            show.value = !show.value
        }

        const shuffle = () => {
            let before = null, after = null

            for (let i = 0; i < 10; i++) {
                let rnd = Math.floor(Math.random(0, list.value.length - 1) * 10)

                before = list.value[i]
                after = list.value[rnd]
                list.value[i] = after
                list.value[rnd] = before
            }
        }

        return {
            show, list,
            action, shuffle
        }
    }
})
</script>

<style>
section {margin-bottom: 20px;}
.wrap {width: 300px; height: 300px; margin-bottom: 10px;}
.box {border: 1px solid #000; box-sizing: border-box; width: 300px; height: 300px; display: flex; flex-direction: row;  align-items: center; justify-content: center;}
.wrap2 {width: 100%; height: 100px; margin-bottom: 10px; display: flex; flex-direction: row;  align-items: center; justify-content: left;}
.box-small {width: 100px; height: 100px; border: 1px solid #000; display: flex; flex-direction: row;  align-items: center; justify-content: center; margin-left: 5px;}
.box-small:first-child {margin: 0;}
.scale-enter-from,
.scale-leave-to {
    transform: scale(0.5);
    opacity: 0;
}
.scale-enter-active,
.scale-leave-active {
    transition: all 0.3s ease;
}
.list-move {transition: transform .5s ease}
</style>