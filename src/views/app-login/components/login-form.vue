
<script setup>
import { computed, ref } from "vue";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button"; 
import { required, minLength, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useRouter } from "vue-router"; 
// Define reactive fields
const username = ref("");
const password = ref("");
const isloading = ref(false);
const router = useRouter(); 
const rules = computed(() => {
    return {
        username: {
            required: helpers.withMessage("Username is required", required)
        },

        password: {
            required: helpers.withMessage("Password is required", required),
            minLength: helpers.withMessage("Password must be at least 12 characters long", minLength(12))
        }
    }
})

const v$ = useVuelidate(rules, { username, password });

const login = async () => {
    try {
        const isValid = await v$.value.$validate();
        if (!isValid) {
            console.log("Validation failed");
            return;
        }

        isloading.value = true;
        setTimeout(() => {
            router.push('/homepage'); 
            isloading.value = false;
        }, 1000); 
    } catch (error) {
        console.error("An error occurred during login:", error);
        isloading.value = false;
    }
};
</script>

<template>
    <div class="login-form">
        <div class="flex items-center justify-center p-[1rem] h-[70vh]">
            <div class="bg-form w-[425px] flex flex-col h-[525px] rounded-md">
                <div class="flex flex-col items-center justify-center p-[2rem] mt-8">
                    <div class="text-white text-center">
                        <p class="font-bold text-[24px]">CHAT BOT</p>
                        <p class="text-[16px]">Enter your credential to login into bot</p>
                    </div>
                </div>
                <div class="flex flex-col items-center justify-center p-[2rem]" @keydown.space.prevent
                    @keyup.enter="login">
                    <div class="mb-[1rem] flex flex-col">
                        <span class="w-[300px] flex input-field">
                            <InputText id="username" v-model="username" type="text" class="input-field-inputtext"
                                placeholder="Username" />
                            <i class="pi pi-user input-field-icon" />
                        </span>
                        <small v-if="v$.username.$error" class="text-red-500 mt-1">
                            {{ v$.username.$errors[0]?.$message }}
                        </small>
                    </div>
                    <div class="w-[300px] flex flex-col mt-[2rem]">
                        <span class="flex w-full">
                            <Password id="password" v-model="password" toggleMask :feedback="false" class="w-full"
                                placeholder="Password" inputClass="w-full" />
                        </span>
                        <small v-if="v$.password.$error" class="text-red-500 mt-1">
                            {{ v$.password.$errors[0]?.$message }}
                        </small>
                    </div>
                    <div class="flex flex-col items-center justify-center p-[5rem]">
                        <Button label="Login" rounded outlined @click="login" :loading="isloading"
                            class="bg-[#156896] w-[8rem] h-[3rem] text-white shadow-lg shadow-[rgba(32,28,28,0.4)] hover:shadow-lg hover:shadow-cyan-500/50" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login-form {
    position: relative;
    animation: login 1s ease-out;
}

@keyframes login {
    0% {
        top: 100px;
        opacity: 0;
    }

    100% {
        top: 0px;
        opacity: 1;
    }
}

.bg-form{
    background: linear-gradient(to top, #424f68, #0e2d6c 70%);
}
:deep(.input-field) {
    border-radius: 0;
    border: none;
    border-bottom: 2px solid #156896;
    background-color: transparent;
    color: white;

    &:focus-within {
        border-bottom: 2px solid rgb(6, 182, 212);
    }
}

:deep(.input-field-inputtext) {
    border-radius: 0;
    border: none;
    background-color: transparent;
    color: white;

    &:focus {
        outline: none;
    }
}

:deep(.input-field-icon) {
    padding: 4px;
    padding-left: 5.6rem;
    background-color: transparent;
    color: rgba(255, 255, 255, 0.5);
}

:deep(.p-inputtext) {
    color: white;
}

:deep(.p-password input) {
    border-radius: 0;
    border: none;
    border-bottom: 2px solid #156896;
    background-color: transparent;
    color: white;

    &:focus {
        border-bottom: 2px solid rgb(6, 182, 212);
        outline: none;
    }
}

:deep(.p-password .p-input-icon-right) {
    color: white;
}
</style>