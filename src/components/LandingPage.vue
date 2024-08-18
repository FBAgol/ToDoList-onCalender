<template>
  <div ref="landingSeite" class="landing-page">
    <h1 data-aos="fade-right">Herzlich Willkommen</h1>
    <p data-aos="fade-left">Organisieren Sie Ihre Aufgaben mühelos mit unserem integrierten Kalender. Planen und
      speichern Sie Ihre täglichen To-Dos, und am Monatsende können Sie alle erledigten Aufgaben bequem als PDF
      herunterladen.</p>
    <div class="buttons">
      <button data-aos="fade-up-right" @click="singInContent" class="button">Sing in</button>
      <button data-aos="fade-up-left" @click="singUPContent" class="button">Sing Up</button>
    </div>
  </div>
  <singin :class="singInActive ? 'show' : 'hidden'">SingIn</singin>
  <singup  @token="getToken($event)" :class="singUpActive ? 'show' : 'hidden'">singup</singup>
</template>

<script setup lang="ts">
import { onMounted, ref, defineEmits } from 'vue'
import AOS from 'aos'
import singin from './auth/SingIn.vue'
import singup from './auth/SingUp.vue'

onMounted(async () => {
  AOS.init({
    duration: 2800,
  })
})

const emits = defineEmits(["tok"])
const singInActive = ref(false)
const landingSeite = ref()

function singInContent() {
  singInActive.value = true
}

const singUpActive = ref(false)

function singUPContent() {
  singUpActive.value = true
  if (singUpActive.value) {
    landingSeite.value.classList.add("hidden")

  }
}


function getToken(e: string) {
  if (e) {
    //console.log("token:    ",e)
    return emits("tok", e)
  }
}
</script>

<style scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

h1 {
  font-size: 3rem;
  color: rgb(53, 47, 47);
  margin-bottom: 1rem;

}

p {
  font-size: 1.2rem;
  color: black;
  margin-bottom: 2rem;
  text-align: center;
 max-width: 85%;
}

.buttons {
  display: flex;
  gap: 1rem;
}

.button {
  padding: 0.8rem 1.5rem;
  background-color: #91d3d0;
  color: black;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #91d39d;
  cursor: pointer;
}

.hidden {
  display: none
}

.show {
  visibility: visible;
}

</style>