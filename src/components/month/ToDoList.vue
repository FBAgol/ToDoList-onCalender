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
        <div class="todos-box">
          <form @submit.prevent="saveToDos">
            <div v-for="(task, index) in listOfTasks" :key="index">
              <div class="todo-label">
                <div class="left-side">
                  <input class="largerCheckbox" type="checkbox" :id="'task-' + index" v-model="task.completed">
                  <label ref="addedTask" :for="'task-' + index">{{ task.text }}</label>
                </div>
                <span class="delete-icon" @click="deletTodo(index)">&#128465;</span>
              </div>
            </div>
            <button>Speichern</button>
          </form>  
        </div>
    </div>
</template>
<script setup lang="ts">
import {ref, watch } from 'vue';
import { mainStore } from '@/store/index'
import { storeToRefs } from 'pinia'
import { TodoBody, TaskRequestBody  } from '@/types/todoInterfaces';

const store = mainStore()
const { clickedDayNumber, currentYear, clickedMonthName, singInToken, singUpToken } = storeToRefs(store)

const addTask=ref<string>('')
const addedTask=ref<string>('')
const listOfTasks=ref<{ text: string, completed: boolean }[]>([])
const availableTodos= ref(true)
const allOfMonth = ['Janur', 'Februar', 'März', 'Apri', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']


function addTaskToList() {
  if (addTask.value !== '') {
    listOfTasks.value.push({ text: addTask.value, completed: false });
    addTask.value = '';
  }
}

watch([clickedDayNumber, clickedMonthName,], ([newDayNumber, newMonthName]) => {
  if(newDayNumber && newMonthName){
    getAvailableTodos()
  }
})


async function getAvailableTodos() {
  if(allOfMonth.findIndex(month=> month===clickedMonthName.value) <10){
    const selectedDate= `${currentYear.value}-0${allOfMonth.findIndex(month=> month===clickedMonthName.value)+1}-${clickedDayNumber.value}`
    const token= singInToken.value?.token || singUpToken.value?.token
    const response= await  fetch(`/getTodo/${selectedDate}`, {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${token}`}})

        if (!response.ok) {
          throw new Error(`Server Error: ${response.statusText}`);
        }
        const data= await response.json()
        if(data==='No Result Found'){
          listOfTasks.value=[]
          availableTodos.value=false
          return
        }else{          
          listOfTasks.value= JSON.parse(data).done
            .map((task: string) => ({ text: task, completed: true }))
            .concat(JSON.parse(data).notDone.map((task: string) => ({ text: task, completed: false })))
        }      
  }
  else{
    const selectedDate= `${currentYear.value}-${allOfMonth.findIndex(month=> month===clickedMonthName.value)+1}-${clickedDayNumber.value}`
    const token= singInToken.value?.token || singUpToken.value?.token
    const response= await  fetch(`/getTodo/${selectedDate}`, {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${token}`}})

        if (!response.ok) {
          throw new Error(`Server Error: ${response.statusText}`);
        }
        const data= await response.json()
        if(data==='No Result Found'){
          listOfTasks.value=[]
          availableTodos.value=false
          return
        }else{
          listOfTasks.value= JSON.parse(data).done
            .map((task: string) => ({ text: task, completed: true }))
            .concat(JSON.parse(data).notDone.map((task: string) => ({ text: task, completed: false })))
        }
    }
}

async function saveTask(date:string, body:TaskRequestBody) {
  const response= await fetch(`/todo/addTodo/${date}`, {
    method: 'POST',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    });
 
    if (!response.ok) {
      throw new Error(`Server Error: ${response.statusText}`);
    }
}

async function update(date:string,token:string | undefined, todo:TodoBody) {
  const body = {
    todo: { 
      done: todo.done, 
      notDone: todo.notDone 
    }
  };
  const response= await  fetch(`/update/${date}`, {
        method: 'PATCH',
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"},
          body: JSON.stringify(body)})

        if (!response.ok) {
          throw new Error(`Server Error: ${response.statusText}`);
        }  
}

async function saveToDos() {
  const bodyTodo={
    token: singInToken.value?.token || singUpToken.value?.token,
    todo: {
      done: listOfTasks.value.filter((task) => task.completed).map((task) => task.text),
      notDone: listOfTasks.value.filter((task) => !task.completed).map((task) => task.text)  
    }
  }

  if(availableTodos.value===false){
    if(allOfMonth.findIndex(month=> month===clickedMonthName.value) <10){
      const selectedDate= `${currentYear.value}-0${allOfMonth.findIndex(month=> month===clickedMonthName.value)+1}-${clickedDayNumber.value}`
      saveTask(selectedDate, bodyTodo)
    }
    else{
      const selectedDate= `${currentYear.value}-${allOfMonth.findIndex(month=> month===clickedMonthName.value)+1}-${clickedDayNumber.value}`
      saveTask(selectedDate, bodyTodo)
    } 
  }
  else{
    const todo= { 
      done: listOfTasks.value.filter((task) => task.completed).map((task) => task.text),
      notDone: listOfTasks.value.filter((task) => !task.completed).map((task) => task.text) 
    }
    if(allOfMonth.findIndex(month=> month===clickedMonthName.value) <10){
      const selectedDate= `${currentYear.value}-0${allOfMonth.findIndex(month=> month===clickedMonthName.value)+1}-${clickedDayNumber.value}`
      const token= singInToken.value?.token || singUpToken.value?.token
      update(selectedDate, token, todo)
    }
    else{
      const selectedDate= `${currentYear.value}-${allOfMonth.findIndex(month=> month===clickedMonthName.value)+1}-${clickedDayNumber.value}`
      const token= singInToken.value?.token || singUpToken.value?.token
      update(selectedDate, token, todo)
    }
  }
}

function deletTodo(index: number) {
  const taskToDelete = listOfTasks.value[index];
  listOfTasks.value.splice(index, 1);
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
  width: 98%;
  /*margin: 5px; */
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

.todos-box {
  width: 98%;
  margin: 5px;
  display: relative;
}

.todo-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  border-radius: 4px;
  padding: 5px;
  margin: 2px;
  height: 18px;
  
}

.left-side {
  display: flex;
  align-items: center;
}

input.largerCheckbox {
  width: 17px;
  height: 17px;
  margin-right: 10px; /* Adds space between checkbox and label */
}

.delete-icon {
  cursor: pointer;
  font-size: 20px;
  padding-left: 10px;
  transition: transform 0.2s ease; /* Smooth transition for hover effect */
}

.delete-icon:hover {
  color: red;
  transform: scale(1.5); /* Increases the size of the icon without affecting layout */
}

</style>