<template>
    <div>
        <section class="currentDate">
            <p >{{ props.currentYear }}-{{ monthName }}</p>
        </section>
        <section class="table" v-for="(month,index) in props.months" :key="index" >
            <table v-if="monthName==month.monthName">
                <tr>
                    <th>Samstag</th>
                    <th>Sonnstag</th>
                    <th>Montag</th>
                    <th>Dienstag</th>
                    <th>Mittwoch</th>
                    <th>Donnerstag</th>
                    <th>Freitag</th>
                </tr>
                <tr >
                    <td v-for="(count,index) in 7" :key="index">{{ count  }}</td>
                </tr>
                <tr>
                    <td v-for="(count,index) in 7" :key="index +7">{{ count +7 }}</td>
                </tr>
                <tr>
                    <td v-for="(count,index) in 7" :key="index +14">{{ count +14 }}</td>
                </tr>
                <tr>
                    <td v-for="(count,index) in 7" :key="index +21">{{ count  +21}}</td>
                </tr>
                <tr>
                    <td v-for="(count,index) in month.countOfDay-28 " :key="index+28">{{ count +28 }}</td>
                </tr>
            </table>
        </section>
        
    </div>
</template>

<script setup lang="ts">
import{watch,ref,defineProps, PropType} from 'vue'
import {monthAndDay} from '../types/interfaces'

const props=defineProps({
    currentYear : {type:Number, required:true},
    months:{type: Array as PropType<monthAndDay[]>, required:true},
    monthName:{type:String, required:true}
})





</script>

<style scoped>
.currentDate{
    border-bottom: 1px solid black;
    text-align: center;
    line-height: 40%;


}
table th{
    border: 1px solid black;
    height: 50px;
    width: 70px;
}

table td{
    border: 1px solid black;
    border-radius: 50%;
    height: 60px;
    text-align: center;
    line-height: 40%;
}
</style>