<template>

  <div class="main">
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
import MonthCalender from './components/MonthCalender.vue'
import DaysCalender from './components/DaysCalender.vue'
import ToDoList from './components/ToDoList.vue'
import { monthAndDay } from '@/types/interfaces'
import { mainStore } from '@/store/index'
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const store = mainStore()
const { currentYear, clickedMonthName, startOfMonth, indexNumber } = storeToRefs(store)
// list of dicts of the monathname and the count of its wohl days
const months = ref<monthAndDay[]>([]);

onMounted(() => {
  // add dict of the monathname and the count of its wohl days to the months variable
  for (let i = 0; i < 12; i++) {
    const monthName = new Date(currentYear.value, i, 1).toLocaleString('default', { month: 'long' });
    // console.log(typeof monthName)
    const daysInMonth = new Date(currentYear.value, i + 1, 0).getDate();
    // console.log(typeof daysInMonth)
    months.value.push({ monthName: monthName, countOfDay: daysInMonth });
  }
})


</script>

<style scoped>
.main {
  display: flex;
}

.main section {
  border: 0.5px solid #e0e0e0;
  border-radius: 10px;
  margin: 1px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  background-color: #fff;
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
</style>
