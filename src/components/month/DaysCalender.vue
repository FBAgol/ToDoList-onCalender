<template>
    <section class="currentDate">
        <p >{{ currentYear}}-{{ clickedMonthName }}</p>
    </section>
    <section v-for="(month,index) in months" :key="index">
        <div  v-if="clickedMonthName==month.monthName">
            <div  class="container">
                <div class="dayname" v-for="(day, index) in weekDays" :key="index">
                    {{ day }}
                </div>
            </div>
            <div class="container days">
                <div class="emptyBox" v-for="(count) in indexNumber" :key="count">{{  }}</div>
                <div @click="sendDayNumber($event)" v-for="(count) in month.countOfDay" :key="count">{{ count }}</div>
            </div>
        </div>
    </section> 
</template>

<script setup lang="ts">
import{ ref} from 'vue'
//import {monthAndDay} from '../../types/interfaces'
import { mainStore } from '@/store/index'
import { storeToRefs } from 'pinia'

const store = mainStore()
const { currentYear, indexNumber, months, clickedMonthName } = storeToRefs(store)


const weekDays=["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]
const dayNumber=ref()

function sendDayNumber(event : MouseEvent){
    const DayNumber= event.target as HTMLParagraphElement;
    store.clickedDayNumber=DayNumber.textContent || ''
    console.log(dayNumber.value)
}
</script>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
}
.container.days{
    display: grid;
    grid-template-columns: repeat(7, minmax(40px, 1fr));
}
.container div {
    /*flex: 1 0 calc(100% / 9);;  5 Divs pro Zeile */
    box-sizing: border-box;
    height: 60px; /* Höhe der Divs */
    background-color: lightblue;
    border: 1px solid blue;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    cursor: pointer
}
.container >.dayname {
    border: 1px solid black;
    height: 50px;
    max-width: 103px;
    border-radius: 10px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    background-color: #fff;
    cursor: default;

}
.currentDate{
    border-bottom: 1px solid black;
    text-align: center;
    line-height: 40%;
}
.container .emptyBox{
    background-color: aqua;
    cursor: default;
}
</style>