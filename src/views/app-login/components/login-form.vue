<script setup>
import { computed, ref } from "vue";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import { required, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useRouter } from "vue-router";
import { AuthAPI } from "@/service/configApi";
import Swal from "sweetalert2";

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const router = useRouter();

const rules = computed(() => ({
    email: { required: helpers.withMessage("Email is required", required) },
    password: { required: helpers.withMessage("Password is required", required) }
}));

const v$ = useVuelidate(rules, { email, password });

const login = async () => {
    try {
        const isValid = await v$.value.$validate();
        if (!isValid) {
            Swal.fire("Validation Failed", "Please fill in all fields correctly", "warning");
            return;
        }

        isLoading.value = true;

        const response = await AuthAPI.login(email.value, password.value);

        // ✅ Store Tokens
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);

        // ✅ Show success message
        Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Redirecting to dashboard...",
            timer: 1500,
            showConfirmButton: false,
        });

        // ✅ Redirect after successful login
        setTimeout(() => router.push("/"), 1500);
    } catch (error) {
        console.error("Login Error:", error);

        if (error.response?.status === 401) {
            // 🔹 Handle Unauthorized (Incorrect Credentials)
            Swal.fire({
                icon: "error",
                title: "Unauthorized",
                text: "Invalid email or password. Please try again.",
            });
        } else if (error.response?.status === 500) {
            // 🔹 Handle Server Errors
            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: "Something went wrong. Please try again later.",
            });
        } else {
            // 🔹 Handle Other Errors
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.response?.data?.detail || "Something went wrong",
            });
        }
    } finally {
        isLoading.value = false;
    }
};

</script>

<template>
    <div class="login-form">
        <div class="flex flex-col items-center justify-center p-[1rem] h-[70vh]">
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
                            <InputText id="email" v-model="email" type="text" class="input-field-inputtext"
                                placeholder="Email" />
                        </span>
                        <small v-if="v$.email.$error" class="text-red-500 mt-1">
                            {{ v$.email.$errors[0]?.$message }}
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
                    <div class="flex flex-col items-center justify-center p-[3rem]">
                        <Button label="Login" rounded outlined @click="login" :loading="isLoading"
                            class="bg-[#156896] w-[8rem] h-[3rem] text-white shadow-lg shadow-[rgba(32,28,28,0.4)] hover:shadow-lg hover:shadow-cyan-500/50" />
                        <Button class="flex mt-6 text-white" @click="router.push('/register')">Don't have an account?
                            Register Account</Button>
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

.bg-form {
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
</style>
