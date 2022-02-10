<template>
    <transition-group tag="ul" class="todo-list-wrap" :name="listTransition">
        <template v-for="(item, index) in list">
            <li class="todo-item" :key="`list-${item.idx}`" v-if="item.state">
                <div>{{item.text}} [{{item.date}}]</div>
                <div>
                    <a href="#" class="icon-edit" @click.prevent="edit(index)">
                        <i class="fas fa-edit" />
                    </a>
                    &nbsp;
                    <a href="#" class="icon-remove " @click.prevent="remove(index)">
                        <i class="fas fa-times" />
                    </a>
                </div>
            </li>
        </template>
    </transition-group>

    <div class="input-area">
        <input type="text" class="form-control" v-model="content" @keydown.enter="regist" />
        <a href="#" class="btn btn-primary" @click.prevent="regist">{{btnName}}</a>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const list = ref([
    {
        idx: 1,
        text: '오늘은 뭘 했어요',
        state: true,
        date: '2021-12-01'
    },
    {
        idx: 2,
        text: '오늘은 뭘 했어요2',
        state: true,
        date: '2021-12-02'
    },
    {
        idx: 3,
        text: '오늘은 뭘 했어요3',
        state: true,
        date: '2021-12-03'
    },
    {
        idx: 4,
        text: '오늘은 뭘 했어요4',
        state: true,
        date: '2021-12-04'
    },
])
const content = ref('')
let editMode = ref(false)
let btnName = computed(() => editMode.value ? '할일 수정': '할일 등록')
let changeIndex = -1
let listTransition = ref('listIn')

const regist = () => {
    const objDate = new Date()
    const date = `${objDate.getFullYear()}-${objDate.getMonth() + 1}-${objDate.getDate()}`

    if (editMode.value) {
        list.value[changeIndex].text = content.value
        content.value = ''
        editMode.value = false
    } else {
        listTransition.value = 'listIn'
        list.value.push({
            text: content.value,
            idx: list.value.length + 1,
            state: true,
            date
        })

        content.value = ''
    }
}

const remove = (index) => {
    listTransition.value = 'listOut'
    list.value[index].state = false
}

const edit = (index) => {
    editMode.value = true
    content.value = list.value[index].text
    changeIndex = index
}
</script>

<style scoped>
.todo-list-wrap {display: block; padding: 0; margin: 0;}
.todo-list-wrap .todo-item {
    display: flex; flex-direction: row; align-items: center; justify-content: space-between;
    border-bottom: 1px solid rgb(151, 151, 151); padding: 15px; border: 1px solid rgb(182, 182, 182);
}
.todo-item .icon-edit {color: blue}
.todo-item .icon-remove {color: red}
.input-area {
    display: flex; flex: 1; flex-direction: row;
    margin-top: 15px;
}
.input-area input {flex: 8; margin-right: 5px}
.input-area a {flex: 1}

.listIn-enter-from, .listIn-leave-to {transform: translateY(20px); opacity: 0}
.listIn-enter-active, .listIn-leave-active {transition: all .2s;}

.listOut-enter-from, .listOut-leave-to {transform: translateX(100%); opacity: 0;}
.listOut-enter-active, .listOut-leave-active {transition: all .5s;}
</style>



