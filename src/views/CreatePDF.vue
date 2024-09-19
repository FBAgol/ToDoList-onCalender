<template>
    <div>
        <form>
            <label for="date">Datum:</label>
            <input v-model="choosedDate" type="date" id="date" name="date">
        </form>
        <button @click="pdfCreater">PDF</button>
    </div>
</template>

<script setup lang="ts">
import {ref } from 'vue';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const listOfTasks = ref<{ text: string, completed: boolean }[]>([])
const choosedDate = ref<string>('')



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