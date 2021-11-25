import axios from 'axios'
import { ref, reactive, toRefs, watch } from 'vue'

export default function() {
    let page = ref(1)
    let list = ref([])
    let total = ref(0)

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

    const getList = async () => {
        const json = await axios.get('https://adreport-api.programrush.co.kr/user/getUserList', {
            params: {
                page: page.value,
                pageSize: 20,
                srchStart: '',
                srchEnd: '',
                srchUseYN: '',
                srchTarget: '',
                srchText: ''
            }
        }).then(res => res.data)

        if (json.result == 'success') {
            if (json.data.length == 0) {

            } else {
                total.value = parseInt(json.total)
                list.value = json.data
            }
        }
    }

    const movePage = (flag) => {
        if (flag == 'next') {
            page.value++
        } else {
            if (page.value > 1) {
                page.value--
            }
        }

        getList()
    }

    return {
        howToUseToRefs,
        page, total, list,
        getList, movePage,
    }
}