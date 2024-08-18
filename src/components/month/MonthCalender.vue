<template>
      <h3>Monate vom Jahr : {{ currentYear }}</h3>
      <div class="">
        <p ref="monthName" v-for="(month, index) in props.months" :key="index" @click="sendMonthname">
        {{ month.monthName }}
      </p>
      </div>
</template>

<script setup lang="ts">
import { ref,defineProps, PropType, defineEmits} from 'vue'
import {monthAndDay} from '../../types/interfaces'
import { mainStore } from '../../store/index'
import { storeToRefs } from 'pinia'

const store = mainStore()
const { currentYear } = storeToRefs(store)

const props= defineProps({
    months: { type: Array as  PropType<monthAndDay[]>, required: true },
    
})

const emits=defineEmits(['monthOnClick'])
const monthName=ref<string>('')
  function sendMonthname(event: MouseEvent) {
  // call the contant of the clicked monthName
  const clickedParagraph = event.target as HTMLParagraphElement;
  monthName.value = clickedParagraph.textContent || '';
  //console.log(monthName.value)
  return emits('monthOnClick', monthName.value)
  
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
  background: #bcf7eb;  
}

div p:hover{
  cursor: pointer;
}
</style>