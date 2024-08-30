<template>
    <div>
       <h2 class="dateTitle">ToDo für {{ clickedMonthName }}-{{ clickedDayNumber }}-{{ currentYear }} </h2> 
        <div class="input-container ic2">
            <input v-model="addTask" id="todo" class="input" type="text" placeholder=" " />
            <div class="cut cut-short"></div>
            <label for="todo" class="placeholder">Add ToDo</label>
            <button @click="addTaskToList" class="add">Add</button>
        </div>
        <hr>
        <div>
            <form action="/action_page.php">
              <div  v-for="(task, index) in listOfTasks" :key="index">
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                <label for="vehicle1">{{ task }}</label><br>
              </div>    
              <button>Speichern</button>
            </form> 
        </div>

    </div>
</template>
<script setup lang="ts">
import {ref } from 'vue';
import { mainStore } from '@/store/index'
import { storeToRefs } from 'pinia'

const store = mainStore()
const { clickedDayNumber, currentYear, clickedMonthName } = storeToRefs(store)

const addTask=ref<string>('')

const listOfTasks=ref<string[]>([])


function addTaskToList(){
  if(addTask.value !== ''){
    listOfTasks.value.push(addTask.value)
    addTask.value=''
  }
    
}

</script>
<style scoped>
.dateTitle{
  text-align: center;
}
hr{
  border-bottom: 1px solid black;
}
.input-container {
  height: 34px;
  position: relative;
  width: 100%;
  margin: 5px;
}

.input {
  background-color: #fff;
  border: 0;
  border-radius: 5px;
  box-sizing: border-box;
  color: black;
  font-size: 16px;
  height: 100%;
  outline: 0;
  padding: 4px 60px 0 20px; /* Rechts Platz für den Button schaffen */
  width: 100%;
}

.add {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #dc2f55;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  height: 28px;
  padding: 0 20px;
}
.cut { 
   border-radius: 10px;
   height: 20px;
   left: 23px;
   position: absolute;
   top: -20px;
   transform: translateY(0);
   transition: transform 200ms;
   width: 76px;
 }
 
 .cut-short {
   width: 65px;
 }
 .input:focus ~ .cut,
  .input:not(:placeholder-shown) ~ .cut {
    transform: translateY(5px);
    backdrop-filter: blur(15px) saturate(153%);
      -webkit-backdrop-filter: blur(15px) saturate(153%);
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      border: 1px solid rgba(209, 213, 219, 0.3);
  }

.placeholder {
  color: #65657b;
  font-family: sans-serif;
  left: 20px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: transform 200ms, color 200ms;
  top: 10px;
}

.input:focus ~ .placeholder,
.input:not(:placeholder-shown) ~ .placeholder {
  transform: translateY(-23px) translateX(8px) scale(0.75);
}

.input:not(:placeholder-shown) ~ .placeholder {
  color: #808097;
}

.input:focus ~ .placeholder {
  color: #dc2f55;
}


</style>