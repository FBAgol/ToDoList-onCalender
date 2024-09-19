<template>
  <div :class="calenderContent ? 'hidden' : 'show'">
    <LaningPage></LaningPage>
  </div>
  <div :class="calenderContent ? 'show' :'hidden'" >
    <nav class="navigation">
      <RouterLink class="router" to="/">Home</RouterLink>
      <RouterLink class="router" to="/profil">Profile</RouterLink>
      <RouterLink  class="router" to="/createpdf">PDF Export</RouterLink>
   </nav>
   <RouterView></RouterView>
  </div>

</template>


<script setup lang="ts">
import LaningPage from './components/LandingPage.vue'
import { ref, onMounted, watch} from 'vue'
import AOS from 'aos'
import { mainStore } from '@/store/index'
import { storeToRefs } from 'pinia'

const store = mainStore()
const { singInToken, singUpToken } = storeToRefs(store)
const calenderContent=ref(false)

watch([singInToken, singUpToken], ([newSignInToken, newSignUpToken]) => {
  if (newSignInToken?.isUser || newSignUpToken?.isSingUp) {
    calenderContent.value = true
  } 
})

onMounted(async()=>{
  AOS.init()

})

</script>

<style scoped>
nav {
  display: flex;
  justify-content: flex-end;
  border: 0.5px solid;
  border-radius: 10px 10px 0 0;
  height: 30px;
  margin: 1px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(15px) saturate(153%);
    -webkit-backdrop-filter: blur(15px) saturate(153%);
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px 10px 0 0;
    border: 1px solid rgba(209, 213, 219, 0.3);
}
.router{
  margin-right: 10px;
  color: #000;
  text-decoration: none;
}
.router:hover {
  color: #841a1a35; }
.hidden{
  display: none
}
.show {
  visibility: visible;
}
</style>
