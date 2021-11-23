import { reactive, toRefs, watch } from 'vue'

export default function() {
    const howToUseToRefs = () => {
        const state = reactive({
            foo: 1,
            bar: 2,
        })

        watch(state, (a, b) => {
            console.log('in common -> ', a, b)
        })

        return toRefs(state)
    }

    return {
        howToUseToRefs
    }
}