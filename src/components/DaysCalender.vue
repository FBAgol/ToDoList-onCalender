<template>
    <div>
        <section class="currentDate">
            <p >{{ props.currentYear }}-{{ monthName }}</p>
        </section>
        <section class="table" v-for="(month,index) in props.months" :key="index" >
            <table v-if="monthName==month.monthName">
                <tr>
                    <th v-for="(day, index) in weekDays" :key="index">{{ day }}</th>
                </tr>
                <tr>
                    <td class="emptyBox" v-for="(count) in props.indexNumber" :key="count">{{ }}</td>
                    <td v-for="(count) in 7-props.indexNumber" :key="count">{{ count }}</td>
                </tr>
               
                <tr>
                    <td v-for="(count,index) in 7" :key="index +7">{{ count +7-props.indexNumber }}</td>
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
import{defineProps, PropType,computed,ref} from 'vue'
import {monthAndDay} from '../types/interfaces'

const props=defineProps({
    currentYear : {type:Number, required:true},
    months:{type: Array as PropType<monthAndDay[]>, required:true},
    monthName:{type:String, required:true},
    startOfMonth:{type:String, required:true},
    indexNumber:{type:Number, required:true}
})

const weekDays=["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]

</script>

<style scoped>
.currentDate{
    border-bottom: 1px solid black;
    text-align: center;
    line-height: 40%;
}
table:first-child{
    margin: 20px;
}
table th{
    border: 1px solid black;
    height: 80px;
    width: 103px;
    border-radius: 10px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    background-color: #fff;
}

table td{
    border: 1px solid black;
    border-radius: 50%;
    height: 60px;
    text-align: center;
    line-height: 40%;
    cursor: pointer;
}

.emptyBox{
    background-color: aqua;
}
</style>