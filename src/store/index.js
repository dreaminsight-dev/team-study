import { createStore } from 'vuex'

export default createStore({
    state: {
        lucky: 7,
        idx: 0,
    },
    getters: {
        getLucky(state) {
            return state.lucky
        },
        getIdx(state) {
            return state.idx
        }
    },
    mutations: {
        setLucky(state, num) {
            state.lucky = num
        },
        setIdx(state, num) {
            state.idx = num
        }
    },
    actions: {
    }
})