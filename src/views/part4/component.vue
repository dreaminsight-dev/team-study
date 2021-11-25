<template>
    <h1>Part.4 Component 더 깊이 보기</h1>

    <v-form style="width: 700px;" ref="form">
        <slots-table>
            <template v-slot:head>
                <tr>
                    <th>No.</th>
                    <th>이름</th>
                    <th>연락처</th>
                    <th>이메일</th>
                    <th>부서</th>
                    <th>직책</th>
                </tr>
            </template>

            <tr :key="`td${i}`" v-for="(item, i) in list">
                <td>{{item.memIdx}}</td>
                <td>{{item.memName}}</td>
                <td>{{item.hp.phoneNumber()}}</td>
                <td>{{item.email}}</td>
                <td>{{item.orgName}}</td>
                <td>{{item.jobName}}</td>
            </tr>

            <template v-slot:foot>
                <tr>
                    <th colspan="6" class="text-end">
                        총 {{total}}명&nbsp;&nbsp;

                        <input-field sm placeholder="숫자입력" :validate="[v => !!v || '숫자를 입력해주요.']" v-model="movePageNum" />
                        &nbsp;
                        <slot-btn sm type="secondary" @click="movePage('prev')">
                            <i class="fas fa-arrow-left" />
                        </slot-btn>
                        &nbsp;
                        <slot-btn sm type="secondary" @click="movePage('next')">
                            <i class="fas fa-arrow-right" />
                        </slot-btn>
                    </th>
                </tr>
            </template>
        </slots-table>

        <p><input-field placeholder="텍스트 입력" :validate="rule" v-model="text1" /></p>
        <p><input-field placeholder="두번째 입력" :validate="rule" v-model="text2" /></p>
        <p><input type="text" class="form-control" /></p>
        <slot-btn type="primary" @click="formCheck">체크</slot-btn>
        &nbsp;
        <a href="#" class="btn btn-success" @click.prevent="reset">이건 뭐여?</a>
    </v-form>
</template>

<script setup>
import { ref } from 'vue'
import vForm from '@/components/validateForm'
import slotBtn from '@/components/slotBtn'
import inputField from '@/components/inputField'
import slotsTable from '@/components/slotsTable'

let text1 = ref('')
let text2 = ref('')
let form = ref(null)
let rule = [v => !!v || '텍스트를 입력하세요!']
let movePageNum = ref('')

const formCheck = () => {
    form.value.validate()
}

const reset = () => {
    form.value.resetForm()
}

import useCommon from '@/js/common'

let { page, list, total, getList, movePage } = {...useCommon()}

getList()
</script>