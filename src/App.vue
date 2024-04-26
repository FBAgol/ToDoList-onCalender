<template>

  <div class="main">
    <section class="allOfMonths">
      <MonthCalender @monthOnClick="getMonthName($event)" :currentYear="currentYear" :months="months">
      </MonthCalender>
    </section>
   
    
    <section class="daysInMonth">
      <DaysCalender :currentYear="currentYear" :months="months" :monthName="m"></DaysCalender>
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

import {ref} from 'vue'

// eine List von den Monaten und die Anzahl der Monatstage 
const months = ref<Array<string|number>[]>([]);
// Aktuelles Jahr bekommen
const currentYear = new Date().getFullYear();
//console.log(currentYear)


// Monate hinzufügen
for (let i = 0; i < 12; i++) {
  const monthName = new Date(currentYear, i, 1).toLocaleString('default', { month: 'long' });
  const daysInMonth = new Date(currentYear, i + 1, 0).getDate();
  //console.log(daysInMonth)
  months.value.push([monthName,daysInMonth]);
  }

  const m=ref<string>('')
function getMonthName(event:string){
   console.log('hl: '+event)
    return event=m.value
}
const date = new Date(); // Get the current date
//console.log(`das ist komplett: ${date}`)
const dayName = date.getDay(); // Get the day of the week as an integer
console.log(`das ist Dayname: ${dayName}`)
// Convert the day of the week integer to a day name
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const day = dayNames[6];
console.log(`das ist: ${day}`)
</script>

<style scoped>

html{
  background-color: #e0e0e0;
}
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
