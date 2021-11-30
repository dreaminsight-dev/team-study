<template>
    <h1>반응형 변수 & Store(VUEX 4)</h1>
    <p>apple: {{apple}}</p>
    <p>ball: {{ball}}</p>
    <p>coffee: {{coffee}}</p>
    <p>compued: {{changed}}</p>
    <p>lucky: {{lucky}}</p>

    <p>
        <a ref="#" class="btn btn-success" @click.prevent="changeApple">apple 바꾸기</a>&nbsp;
        <a ref="#" class="btn btn-primary" @click.prevent="changeBall">ball 바꾸기</a>&nbsp;
        <a ref="#" class="btn btn-info" @click.prevent="changeCoffee">coffee 바꾸기</a>&nbsp;
        <a ref="#" class="btn btn-secondary" @click.prevent="addArray">ball 배열 추가</a>&nbsp;
        <a ref="#" class="btn btn-warning" @click.prevent="changeState">state 변경</a>&nbsp;
        <a ref="#" class="btn btn-warning" @click.prevent="changeRefs">state toRefs</a>&nbsp;
        <a ref="#" class="btn btn-danger" @click.prevent="showVuex">VUEX 확인</a>
    </p>
</template>

<script setup>
import { ref, reactive, toRefs, watch, computed } from 'vue'

let apple = ref(1)
let ball = ref([1, 2, 3, 4])
let coffee = reactive({
    hot: 'is hot',
    ice: 'is ice'
})
let num = 0
let ballBefore = ref([])

watch(apple, (a, b) => {
    console.log('watch apple', a, b)
})

// 배열의 ref, reactive 경우 정확히 감시할 배열 또는 인자를 지정해줘야 하고 익명함수로 랩핑 해줘야 한다
watch([() => ball.value[0], () => ball.value[1]], (a, b) => {
    console.log('watch ball', a, b)
})

// 배열이 추가 되거나 삭제되는 상태는 감지가 되지 않는다.
watch(() => ball.value.length, (a, b) => {
    console.log('ball watch before', ballBefore.value)
    console.log('ball watch after', ball.value)
})

watch([() => coffee.hot, () => coffee.ice], (a, b) => {
    console.log('watch coffee', a, b)
})

const arrayChanged = computed(() => {
    if (ball.value.length) {
        console.log('computed', ball.value)
    }
})

const changed = computed(() => {
    let ballValue0 = ball.value[0]
    let ballValue1 = ball.value[1]
    let isHot = coffee.hot
    let len = ball.value.length

    if (apple.value || ballValue0 > 1 || ballValue1 > 1 || len > 5 || isHot != 'is hot') {
        num++
    }

    return num
})

const changeApple = () => {
    apple.value++
}

const changeBall = () => {
    if (ball.value[0] < ball.value[1]) {
        ball.value[0]++
    } else {
        ball.value[1]++
    }
}

const changeCoffee = () => {
    if (coffee.hot == 'is hot') {
        coffee.hot = 'is not hot'
    } else {
        coffee.hot = 'is hot'
    }

    if (coffee.ice == 'is ice') {
        coffee.ice = 'is not ice'
    } else {
        coffee.ice = 'is ice'
    }
}

const addArray = () => {
    ballBefore.value = JSON.parse(JSON.stringify(ball.value))
    ball.value.push(0)
}

/*
    reactive로 선언된 변수를 구조 분해를 하여 사용 할 경우
    각각의 property는 반응형으로 동작하지 않는다.
    각각의 속성을 반응형으로 구조 분해 하여 사용 하고 싶다면
    toRefs로 컨버트 후 구조 분해하여 사용 가능
*/
const state = reactive({
    foo: 1,
    bar: 2
})

const changeState = () => {
    state.foo++
    state.bar++

    console.log('origin', state.foo, state.bar)

    let { foo, bar } = state

    console.log('ref', foo, bar)

    return toRefs(state)
}

const changeRefs = () => {
    const refState = changeState()
    let { foo, bar } = refState

    foo.value++
    bar.value++

    console.log('toRefs', foo.value, bar.value)
}

import { useStore } from 'vuex'

const store = useStore()

const showVuex = () => {
    const { state, getters, commit  } = {...store}

    commit('setLucky', 77)
    console.log('getters', getters.getLucky)
    console.log('store.state', store.state.lucky)
    console.log('state', state.lucky)
}

const lucky = computed(() => store.state.lucky)

</script>

<style>
button {margin-right: 10px; color: #000;}
</style>