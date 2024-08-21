<template>
  <div :class="calenderContent ? 'hidden' : 'show'">
    <LaningPage @tok="getToken($event)" @is-auth="getAuthResult($event)"></LaningPage>
  </div>
  <div :class="calenderContent ? 'show' :'hidden'" class="main">
    <section class="allOfMonths">
      <MonthCalender @monthOnClick="store.getMonthName($event), store.indexFirstMonthDay($event)"
        :currentYear="currentYear" :months="months">
      </MonthCalender>
    </section>

    <section class="daysInMonth">
      <DaysCalender :currentYear="currentYear" :months="months" :startOfMonth="startOfMonth"
        :monthName="clickedMonthName" :indexNumber="indexNumber"></DaysCalender>
    </section>

    <section class="toDo">
      <ToDoList :currentYear="currentYear" :monthName="clickedMonthName"></ToDoList>
    </section>
  </div>



 
</template>


<script setup lang="ts">
import MonthCalender from './components/month/MonthCalender.vue'
import DaysCalender from './components/month/DaysCalender.vue'
import ToDoList from './components/month/ToDoList.vue'
import LaningPage from './components/LandingPage.vue'
import { monthAndDay } from '@/types/interfaces'
import { mainStore } from '@/store/index'
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import AOS from 'aos'




const calenderContent=ref(false)

function getToken(e:string){
  if(e) {
    calenderContent.value=true  
  }
}

function getAuthResult(e:boolean){
  if(e) {
    calenderContent.value=true  
  }
}
const store = mainStore()
const { currentYear, clickedMonthName, startOfMonth, indexNumber } = storeToRefs(store)
// list of dicts of the monathname and the count of its wohl days
const months = ref<monthAndDay[]>([]);

const monthInfo= (()=>{
  // add dict of the monathname and the count of its wohl days to the months variable
  for (let i = 0; i < 12; i++) {
    const monthName = new Date(currentYear.value, i, 1).toLocaleString('default', { month: 'long' });
    // console.log(typeof monthName)
    const daysInMonth = new Date(currentYear.value, i + 1, 0).getDate();
    // console.log(typeof daysInMonth)
    months.value.push({ monthName: monthName, countOfDay: daysInMonth });
  }

})

onMounted(async()=>{
  monthInfo(), 
  AOS.init()

})

</script>

<style scoped>
.main {
  display: flex;
}

.main section {
  border: 0.5px solid;
  border-radius: 10px;
  margin: 1px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(15px) saturate(153%);
    -webkit-backdrop-filter: blur(15px) saturate(153%);
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
 
}

.allOfMonths {
  flex-grow: 2;
  max-width: 21%;
}

.daysInMonth {
  flex-grow: 5;
  max-width: 40%;
}

.toDo {
  flex-grow: 3;
  max-width: 39%;
}
.hidden{
  display: none
}
.show {
  visibility: visible;
}
</style>
