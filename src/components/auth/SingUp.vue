<template> 
  <div>
      
      <form @submit.prevent="getUserData" class="form">
        <div class="title">SingUp</div>
        <div class="subtitle">Let's create your account!</div>
        <div class="input-container ic1">
          <input v-model="fname" id="firstname" class="input" type="text" placeholder=" " />
          <div class="cut"></div>
          <label for="firstname" class="placeholder">First name</label>
        </div>
        <div class="input-container ic2">
          <input v-model="lastname" id="lastname" class="input" type="text" placeholder=" " />
          <div class="cut"></div>
          <label for="lastname" class="placeholder">Last name</label>
        </div>
        <div class="input-container ic2">
          <input v-model="email" id="email" class="input" type="text" placeholder=" " />
          <div class="cut cut-short"></div>
          <label for="email" class="placeholder">Email</label>
        </div>
        <div class="input-container ic2">
          <input v-model="password" id="password" class="input" type="text" placeholder=" " />
          <div class="cut cut-short"></div>
          <label for="password" class="placeholder">Password</label>
        </div>
        <button  class="submit">submit</button>
    </form>
   
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import AOS from 'aos'

const emits=defineEmits(["token", "userDupplicate"])
const fname = ref<string>("");
const lastname = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");

const userDupplicate=ref(false)



async function getUserData(): Promise<string | void> {
    const user = {
        firstname: fname.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value,
    };

    try {
        // in fetch sollen wir nicht "http://localhost:3000/" schrieben das wurde in vue.config.js für Proxy
        // verwendet. das heißt alle fetch api bekommen diese Adresse und wir müssen nur den Endpointname schreiben.
        const response = await fetch("/user", 
            {
                method: "POST", 
                //credentials: 'include',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }
        );

        if (!response.ok) {
            const errorText = await response.json();
            if(errorText.message==="User already exists"){
              userDupplicate.value=true
              if(userDupplicate.value){
                emits("userDupplicate", userDupplicate.value)
              
              }
            }
            
            throw new Error(`Server Error 1: ${errorText.message}`);
        }

        const result = await response.json();
      
        //console.log(typeof result)
         emits("token", result)


    } catch (error) {
        console.error("Fetch error 2:", error);
    }
}
AOS.init({
    duration: 2800,
  })

</script>


<style scoped>


.form {
  border-radius: 20px;
  box-sizing: border-box;
  height: 530px;
  padding: 20px;
  margin: 10px 0 10px 0;
  width: 320px;
  backdrop-filter: blur(15px) saturate(153%);
    -webkit-backdrop-filter: blur(15px) saturate(153%);
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);

}

.title {
  color: black;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin-top: 30px;
}

.subtitle {
  color: black;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
}

.input-container {
  height: 50px;
  position: relative;
  width: 100%;
}

.ic1 {
  margin-top: 40px;
}

.ic2 {
  margin-top: 30px;
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

.show{
  visibility: visible;
}

.hidden{
  display: none;
}
</style>