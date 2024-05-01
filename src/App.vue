<template>

  <div class="main">
    <section class="allOfMonths">
      <MonthCalender @monthOnClick="getMonthName($event)" :currentYear="currentYear" :months="months">
      </MonthCalender>
    </section>
   
    
    <section class="daysInMonth">
      <DaysCalender :currentYear="currentYear" :months="months" :monthName="clickedMonthName"></DaysCalender>
    </section>
    <section class="toDo">
      <ToDoList></ToDoList>
    </section>
  </div>
</template>


<script setup lang="ts">
import MonthCalender from './components/MonthCalender.vue'
import DaysCalender from './components/DaysCalender.vue'
import ToDoList from './components/ToDoList.vue'
import {monthAndDay} from './types/interfaces'

import {computed, ref} from 'vue'



// eine List von den Monaten und die Anzahl der Monatstage 
const months = ref<monthAndDay[]>([]);
// Aktuelles Jahr bekommen
const currentYear = new Date().getFullYear();
//console.log(currentYear)


// Monate hinzufügen
for (let i = 0; i < 12; i++) {
  const monthName = new Date(currentYear, i, 1).toLocaleString('default', { month: 'long' });
 // console.log(typeof monthName)
  const daysInMonth = new Date(currentYear, i + 1, 0).getDate();
  // console.log(typeof daysInMonth)
  months.value.push({monthName:monthName, countOfDay:daysInMonth});
  }

  //console.log(months)

const clickedMonthName=ref<string>('Janur')
function getMonthName(event:string){
   clickedMonthName.value=event
    return clickedMonthName.value
}

const allOfMonth= ['Janur','Februar','März','Apri','Mai','juni','Juli','August','September','Oktober','November','Dezember']






// in Date(year, month, day) --> alle müssen Zahlen sein --> dann können wir sehen was ist der erste Tag jedes Monates  

function startOfMonth(date:Date)
  {
    let startOfMonthDate = new Date(date.getFullYear(), 0, 1);
    allOfMonth.forEach(month=>{
   if(month==clickedMonthName.value){
    startOfMonthDate = new Date(date.getFullYear(), allOfMonth.indexOf(month), 1);
  }
})
    
    return startOfMonthDate;
}

const dt =new Date(); 
console.log(startOfMonth(dt).toString());
</script>

<style scoped>


.main{
  display: flex;
}


.main section{
  border: 0.5px solid #e0e0e0;
  border-radius: 10px;
  margin: 1px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  background-color: #fff;
}
.allOfMonths{
  flex-grow: 2;
  max-width: 21%;
}
.daysInMonth{
  flex-grow: 5;
  max-width: 40%;
}
.toDo{
  flex-grow: 3;
  max-width: 39%;
}

</style>
