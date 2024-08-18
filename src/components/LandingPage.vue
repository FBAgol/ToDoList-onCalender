<template>
    <div ref="gh" class="landing-page">
      <h1 data-aos="fade-right">Welcome</h1>
      <p>This is a landing page with sign-in and sign-up options.</p>
      <div data-aos="fade-left" class="buttons">
        <button  @click="singInContent"  class="button">Sing in</button>
        <button  @click="singUPContent" class="button">Sing Up</button>
      </div>
    </div>
        <singin :class="singInActive ? 'show': 'hidden'">SingIn</singin>
        <singup @token="getToken($event)" :class="singUpActive ? 'show': 'hidden'">singup</singup>
  </template>
  
  <script setup lang="ts">
  import {onMounted,ref,defineEmits} from 'vue'
  import AOS from 'aos'
  import singin from './auth/SingIn.vue'
  import singup from './auth/SingUp.vue'

  onMounted(async()=>{ 
  AOS.init()
})

const emits=defineEmits(["tok"])
const singInActive=ref(false)
const gh=ref()

function singInContent() {
  singInActive.value= true
}

const singUpActive=ref(false)

function singUPContent() {   
  singUpActive.value= true
  if(singUpActive.value){
    gh.value.classList.add("hidden")

  }
}


function getToken(e:string){
  if(e) {
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
    background-color:  #15172b; /* Darker background color */
    text-align: center;
  }
  
  h1 {
    font-size: 3rem;
    color: #f0f0f0; /* Light color for text */
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    color: #d0d0d0; 
    margin-bottom: 2rem;
  }
  
  .buttons {
    display: flex;
    gap: 1rem;
  }
  
  .button {
    padding: 0.8rem 1.5rem;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-size: 1rem;
    transition: background-color 0.3s;
  }
  
  .button:hover {
    background-color: #0056b3;
  }
  .hidden{
    display: none
  }

  .show{
    visibility: visible;
  }
  </style>
  