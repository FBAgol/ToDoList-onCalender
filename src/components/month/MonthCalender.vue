<template>
      <h3>Jahr : {{ currentYear }}</h3>
      <div class="">
        <p ref="monthName" v-for="(month, index) in months" :key="index" @click="sendMonthname">
        {{ month.monthName }}
      </p>
      </div>
</template>

<script setup lang="ts">
import { ref} from 'vue'
import { mainStore } from '../../store/index'
import { storeToRefs } from 'pinia'

const store = mainStore()
const { currentYear, months } = storeToRefs(store)


const monthName=ref<string>('')
  function sendMonthname(event: MouseEvent) {
  // call the contant of the clicked monthName
  const clickedParagraph = event.target as HTMLParagraphElement;
  store.indexFirstMonthDay(clickedParagraph.textContent || '')
  store.clickedMonthName = clickedParagraph.textContent || '';
  
}

</script >

<style scoped>

div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  
  
}

div p {
  font-size: large;
  width: 80px;
  height: 40px; 
  margin: 1px;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  background-color: #fff;  
}

div p:hover{
  cursor: pointer;
}
</style>