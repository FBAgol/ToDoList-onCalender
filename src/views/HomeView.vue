<template>
  <div class="main">
    <section class="allOfMonths">
    <MonthCalender></MonthCalender>
  </section>
  <section class="daysInMonth">
    <DaysCalender ></DaysCalender>
  </section>
  <section class="toDo">
    <ToDoList></ToDoList>
  </section>
  </div>
</template>

<script setup lang="ts">
import MonthCalender from '../components/month/MonthCalender.vue'
import DaysCalender from '../components/month/DaysCalender.vue'
import ToDoList from '../components/month/ToDoList.vue'
import { mainStore } from '../store/index'
import { onMounted } from 'vue'
import AOS from 'aos'

const store = mainStore()

onMounted(async () => {
  // Überprüfe, ob die Monate schon geladen sind, um doppelte Aufrufe zu vermeiden
  if (!store.months || store.months.length === 0) {
    store.monthInfo(); 
  }
  AOS.init();
});

</script>

<style scoped>
.main {
  display: flex;
}

.main section {
  border: 0.5px solid;
  border-radius: 0 0 10px 10px;
  margin: 1px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(15px) saturate(153%);
    -webkit-backdrop-filter: blur(15px) saturate(153%);
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 0 0 10px 10px;
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




