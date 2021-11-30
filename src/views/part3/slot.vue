<template>
    <h1>Part.3 Slots 사용 방법</h1>

    <div style="width: 700px;">
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
            <template v-slot:default>
                <tr :key="`td${i}`" v-for="(item, i) in list">
                    <td>{{item.memIdx}}</td>
                    <td>{{item.memName}}</td>
                    <td>{{item.hp}}</td>
                    <td>{{item.email}}</td>
                    <td>{{item.orgName}}</td>
                    <td>{{item.jobName}}</td>
                </tr>
            </template>
            <template v-slot:foot>
                <tr>
                    <th colspan="6" class="text-end">
                        총 {{total}}명&nbsp;&nbsp;

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
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useCommon from '@/js/common'
import slotBtn from '@/components/slotBtn'
import slotsTable from '@/components/slotsTable'

let { page, list, total, getList, movePage } = {...useCommon()}

getList()
</script>