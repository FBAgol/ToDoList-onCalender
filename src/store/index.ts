import { defineStore } from "pinia";
import { ref } from 'vue'


export const mainStore = defineStore('store', () => {
  // current year
  const currentYear = ref<number>(new Date().getFullYear());  
  const clickedMonthName = ref<string>('Janur')
  const startOfMonth = ref<string>("")
  const indexNumber = ref<number>(-1)
  const allOfMonth = ['Janur', 'Februar', 'März', 'Apri', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']

  function getMonthName(event: string) {
    // get the clicked monthname 
    clickedMonthName.value = event
    return clickedMonthName.value
  }

  function indexFirstMonthDay(event: string) {
    // get the first Monthdayname in a string 
    let startOfMonthDate = new Date(currentYear.value, 0, 1);
    allOfMonth.forEach(month => {
      if (month == event) {
        startOfMonthDate = new Date(currentYear.value, allOfMonth.indexOf(month), 1);

      }
    })
    //console.log(startOfMonthDate.toString().slice(0,4))  
    // get indexNumber of the first Monthday
    indexNumber.value = (startOfMonthDate.getDay() + 6) % 7 // Sunday index= 0 
    //console.log(indexNumber.value);
  }

  return {
    currentYear,
    clickedMonthName,
    indexFirstMonthDay,
    indexNumber,
    getMonthName,
    startOfMonth,
    allOfMonth,
  }


})


