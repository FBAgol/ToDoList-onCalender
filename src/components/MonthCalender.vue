<template>
      <h3>Monate vom Jahr : {{ props.currentYear }}</h3>
      <div class="">
        <p ref="monthName" v-for="(month, index) in props.months" :key="index" @click="clickOnMonth">
        {{ month[0] }}
      </p>
      </div>
</template>

<script setup lang="ts">
import { ref,defineProps, PropType, defineEmits} from 'vue'


const props= defineProps({
    months: { type: Array as  PropType<Array<Array<string | number>>>, required: true },
    currentYear: { type: Number, required: true },
    
})

const emits=defineEmits(['monthOnClick'])
const monthName=ref<string>('')
  function clickOnMonth(event: MouseEvent) {
  // Den Inhalt des geklickten <p>-Tags abrufen
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
  background: #eeeded;  
}

div p:hover{
  cursor: pointer;
}
</style>