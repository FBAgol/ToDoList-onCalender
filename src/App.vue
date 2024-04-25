<template>

  <div class="main">
    <section class="allOfMonths">
      <h3>Monate vom Jahr : {{ currentYear }}</h3>
      <div class="">
        <p v-for="(month, index) in months" :key="index">
        {{ month[0] }}
      </p>
      </div>
      
    </section>
    <section class="daysInMonth">
      <p>hier kommen Monatstage</p>
    </section>
    <section class="toDo">
      <p>hier kommen Todoliste</p>
    </section>
  </div>
</template>


<script setup lang="ts">
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
  months.value.push([monthName,daysInMonth]);
  }


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
.allOfMonths div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  
}

.allOfMonths div p {
  font-size: large;
  width: 80px;
  height: 40px; 
  margin: 1px;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  background: #eeeded;  
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
