import { defineStore } from "pinia";
import { ref } from 'vue'
import { monthAndDay } from '../types/interfaces'

export const mainStore = defineStore('store', () => {
  // current year
  const currentYear = ref<number>(new Date().getFullYear());  
  const clickedMonthName = ref<string>('Janur')
  const startOfMonth = ref<string>("")
  const indexNumber = ref<number>(-1)
  const allOfMonth = ['Janur', 'Februar', 'März', 'Apri', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
  const clickedDayNumber=ref<string>("")


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

  interface authResult{
    token: string,
    isUser: boolean
  }

  const singInToken= ref<authResult | null>()

  interface singUpResult{
    token:string
    isSingUp:boolean
  }

  const singUpToken= ref<singUpResult | null>()

  function setToken(token: authResult | singUpResult | null){
    if(token){
      if('isUser' in token){
        singInToken.value=token
      }else{
        singUpToken.value=token
      }
    }     
  }




  return {
    currentYear,
    clickedMonthName,
    indexFirstMonthDay,
    indexNumber,
    startOfMonth,
    allOfMonth,
    singInToken, 
    setToken, 
    singUpToken,
    clickedDayNumber, 
    monthInfo,
    months
  }


})


