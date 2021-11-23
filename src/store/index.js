import { createStore } from 'vuex'

export default createStore({
    state: {
        lucky: 7
    },
    getters: {
        getLucky(state) {
            return state.lucky
        }
    },
    mutations: {
        setLucky(state, num) {
            state.lucky = num
        }
    },
    actions: {
    }
})