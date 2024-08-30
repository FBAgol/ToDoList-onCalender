<template>
    <div>
        <form class="form">
            <div class="flex-container">
                <div class="foto-container">
                        <input v-model="foto" id="foto" class="input-foto" type="" placeholder=" " />
                        <label for="foto" class="placeholder">Foto</label>
                </div>
                <div class="flex">
                    <div class="input-container">
                        <input v-model="fname" id="firstname" class="input" type="text" placeholder=" " />
                        <div class="cut"></div>
                        <label for="firstname" class="placeholder">First name</label>
                    </div>
                    <div class="input-container">
                        <input v-model="lastname" id="lastname" class="input" type="text" placeholder=" " />
                        <div class="cut"></div>
                        <label for="lastname" class="placeholder">Last name</label>
                    </div>
                </div>

                <div class="flex">
                    <div class="input-container">
                        <input v-model="email" id="email" class="input" type="text" placeholder=" " />
                        <div class="cut cut-short"></div>
                        <label for="email" class="placeholder">Email</label>
                    </div>
                    <div class="input-container">
                        <input v-model="password" id="password" class="input" type="text" placeholder=" " />
                        <div class="cut cut-short"></div>
                        <label for="password" class="placeholder">Password</label>
                    </div>
                </div>

            </div>
           
      <button  class="submit">Edit Data</button>
      <button  class="submit">submit</button>
    </form>
    </div>
</template>

<script setup lang="ts">
import { ref} from 'vue';
import { mainStore } from '@/store/index'
import { storeToRefs } from 'pinia'

const store = mainStore()
const { singInToken, singUpToken} = storeToRefs(store)
const fname = ref<string>("");
const lastname = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const foto = ref<string>("");


if (singInToken.value) {
  fetch(`/user/token?token=${singInToken.value.token}`)
  .then(response => response.json())
  .then(data => {
    console.log("singIn",data)
    fname.value=data.firstname;
    lastname.value=data.lastname;
    email.value=data.email;
    password.value=data.password;
  });
}
if (singUpToken.value) {
  fetch(`/user/token?token=${singUpToken.value.token}`)
  .then(response => response.json())
  .then(data => {
    console.log("singIn",data)
    fname.value=data.firstname;
    lastname.value=data.lastname;
    email.value=data.email;
    password.value=data.password;
  })
}








</script>

<style>

.form {
  border-radius: 20px;
  box-sizing: border-box;
  min-height: 300px;
  padding: 20px;
  margin: 10px 0 10px 0;
  width: 500px;
  backdrop-filter: blur(15px) saturate(153%);
  -webkit-backdrop-filter: blur(15px) saturate(153%);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);

}
.flex-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.flex {
  display:inline-flex;
}


.input-container {
  height: 50px;
  position: relative;
  width: 100%;
  margin: 4px;
}
.foto-container{
  height: 150px;
  position: relative;
  width: 15%;
  margin: 4px;
}

.input {
  background-color:  #d4ded6;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: black;
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 4px 20px 0;
  width: 100%;
}

.input-foto{
background-color:  #d4ded6;
  border-radius: 100%;
  border: 0;
  box-sizing: border-box;
  color: black;
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 4px 20px 0;
  width: 100%;
}
.cut {
 
  border-radius: 10px;
  height: 20px;
  left: 20px;
  position: absolute;
  top: -20px;
  transform: translateY(0);
  transition: transform 200ms;
  width: 76px;
}

.cut-short {
  width: 50px;
}

.input:focus ~ .cut,
.input:not(:placeholder-shown) ~ .cut {
  transform: translateY(8px);
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
  top: 20px;
}

.input:focus ~ .placeholder,
.input:not(:placeholder-shown) ~ .placeholder {
  transform: translateY(-30px) translateX(10px) scale(0.75);
}

.input:not(:placeholder-shown) ~ .placeholder {
  color: #808097;
}

.input:focus ~ .placeholder {
  color: #dc2f55;
}

.submit {
  background-color: #08d;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 25px;
  /* outline: 0; */
  text-align: center;
  width: 100%;
}

.submit:active {
  background-color: #06b;
}
</style>