<template>
  <!--
    <div>
        <form>
            <label for="date">Datum:</label>
            <input v-model="choosedDate" type="date" id="date" name="date">
        </form>
        <button @click="pdfCreater">PDF</button>
    </div> -->

    <div class="">
        <p ref="clickedMonth" v-for="(month, index) in months" :key="index">
        {{ month.monthName }}
      </p>
    </div>
    <button @click="pdfCreater">PDF</button>
</template>

<script setup lang="ts">
import {ref } from 'vue';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { mainStore } from '@/store/index'
import { storeToRefs } from 'pinia'

const store = mainStore()
const { months } = storeToRefs(store)

const listOfTasks = ref<{ text: string, completed: boolean }[]>([])
const clickedMonth = ref<string>('')



function pdfCreater() {
  const doc = new jsPDF();

  // Erstelle eine nummerierte Liste der erledigten Aufgaben
  const completedTasks = listOfTasks.value
    .filter((task) => task.completed)
    .map((task, index) => `${index + 1}. ${task.text}`)
    .join('\n');

  // Erstelle eine nummerierte Liste der nicht erledigten Aufgaben
  const notCompletedTasks = listOfTasks.value
    .filter((task) => !task.completed)
    .map((task, index) => `${index + 1}. ${task.text}`)
    .join('\n');

  // Generiere die Tabelle für das PDF
  autoTable(doc, {
    head: [['Datum', 'Tag', 'Erledigt', 'Nicht Erledigt']],
    body: [
      [
        '1',
        'Montag',
        completedTasks || 'Keine Todos ', 
        notCompletedTasks || 'keine Todos',
      ],
      // Weitere Zeilen nach Bedarf hinzufügen
    ],
  });

  // Speichern der PDF-Datei
  doc.save('table.pdf');
}
</script>
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