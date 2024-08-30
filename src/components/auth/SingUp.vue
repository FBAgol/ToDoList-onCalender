<template> 
  <div>
    <div :class="userDupplicate ? 'show error'  : 'hidden'">
        <span>{{ errorContent }}</span><b @click="closeError" class="multiplication">&times;</b>
    </div>
    <form @submit.prevent="getUserData" class="form">
      <div class="title">SingUp</div>
      <div class="subtitle">Let's create your account!</div>
      <div class="input-container ic1">
        <input v-model="fname" id="firstname" class="input" type="text" placeholder=" " />
        <div class="cut"></div>
        <label for="firstname" class="placeholder">First name</label>
      </div>
      <p class="invalidError">{{ fnameError }}</p>
      <div class="input-container ic2">
        <input v-model="lastname" id="lastname" class="input" type="text" placeholder=" " />
        <div class="cut"></div>
        <label for="lastname" class="placeholder">Last name</label>
      </div>
      <p class="invalidError">{{ lastnameError }}</p>
      <div class="input-container ic2">
        <input v-model="email" id="email" class="input" type="text" placeholder=" " />
        <div class="cut cut-short"></div>
        <label for="email" class="placeholder">Email</label>
      </div>
      <p class="invalidError">{{ emailError }}</p>
      <p class="invalidError">{{ emptyEmail }}</p>
      <div class="input-container ic2">
        <input v-model="password" id="password" class="input" type="text" placeholder=" " />
        <div class="cut cut-short"></div>
        <label for="password" class="placeholder">Password</label>
      </div>
      <p class="invalidError">{{ passwordError }}</p>
      <p class="invalidError">{{ emptyPasssword }}</p>
      <button  class="submit">submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref} from 'vue';
import AOS from 'aos'
import { mainStore } from '@/store/index'

interface singUpResult{
  token:string
  isSingUp:boolean
}

const store = mainStore()
const fname = ref<string>("");
const fnameError=ref<string>("")
const lastname = ref<string>("");
const lastnameError=ref<string>("")
const email = ref<string>("");
const emailError = ref<string | null>(null);
const emptyEmail=ref<string>("")
const password = ref<string>("");
const passwordError = ref<string | null>(null);
const emptyPasssword=ref<string>("")
const errorContent = ref<string>("* User already exists. Bitte versuchen Sie mit den anderen Daten");
const userDupplicate=ref(false)

const singUpRes=ref<singUpResult | null>(null)


function validateEmail() {
  // Regex für die Gmail-Adresse
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.(com|de|org|net|[a-zA-Z]{2,})$/;

  if( email.value.length > 0){

    if (!emailRegex.test(email.value) ) {
    emailError.value = "* Die E-Mail-Adresse muss auf @gmail mit einer gültigen TLD enden und nur bestimmte Zeichen enthalten.";
  } else {
    return email.value;
    // Weitere Logik hier, z.B. das Absenden des Formulars
  }
  }else{
    emptyEmail.value="* Bitte geben Sie Ihre E-Mail-Adresse ein."

  }

  
}

function validatePassword() {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;"'<>,.?/\\|-]).{8,}$/;

  if ( password.value.length > 0) {
    if (!passwordRegex.test(password.value)) {
    passwordError.value = "* Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, eine Zahl und ein Sonderzeichen enthalten.";
  } else {
   return password.value;
  }
  } else {
    emptyPasssword.value="* Bitte geben Sie Ihr Passwort ein."
   
  }

 
}

const validateFirstName = () => {
  if (fname.value.length===0) {
    fnameError.value = "* Bitte geben Sie Ihren Vornamen ein.";
    
  } else {
    return fname.value;
  }
};

const validateLastName = () => {
  if (lastname.value.length===0) {
    lastnameError.value = "* Bitte geben Sie Ihren Nachnamen ein.";
    
  } else {
    return lastname.value;
  }
};

async function getUserData(): Promise<string | void> {
    const user = {
        firstname: validateFirstName(),
        lastname: validateLastName(),
        email: validateEmail(),
        password: validatePassword(),
    };

    try {
        // in fetch sollen wir nicht "http://localhost:3000/" schrieben das wurde in vue.config.js für Proxy
        // verwendet. das heißt alle fetch api bekommen diese Adresse und wir müssen nur den Endpointname schreiben.
        const response = await fetch("/user/register", 
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
            }
            
            throw new Error(`Server Error 1: ${errorText.message}`);
        }

        const token = await response.json();
        localStorage.setItem("token", token);
        singUpRes.value={token:token, isSingUp:true}
        store.setToken(singUpRes.value)
      



    } catch (error) {
        console.log(error)
    }
}

function closeError(){
  userDupplicate.value=false
 
  }
  

AOS.init({
    duration: 2800,
  })

</script>


<style scoped>


.form {
  border-radius: 20px;
  box-sizing: border-box;
  min-height: 520px;
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
  margin-top: 22px;
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
  margin-top: 35px;
} 

.ic2 {
  margin-top: 25px;
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
@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.show {
 visibility: visible;
  opacity: 1;
  animation: slideInFromLeft 2.3s ease-in-out;
}
.hidden {
  display: none;
}
.error {
  display: flex;
  justify-content: space-around;
    background-color: #f44336;
    color: white;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 10px;
    width: 300px;
  }
  .multiplication{
    cursor: pointer;
  }
  .invalidError{
  font-size: 14px;
  }
</style>