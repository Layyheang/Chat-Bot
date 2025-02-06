<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { required, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import { AuthAPI } from "@/service/configApi";
import Swal from "sweetalert2";

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);
const router = useRouter();

// Validation Rules
const rules = computed(() => ({
    username: { required: helpers.withMessage("Username is required", required) },
    email: { required: helpers.withMessage("Email is required", required) },
    password: { required: helpers.withMessage("Password is required", required) },
    confirmPassword: {
        required: helpers.withMessage("Confirm Password is required", required),
        sameAsPassword: helpers.withMessage(
            "Passwords must match",
            (value) => value === password.value
        ),
    },
}));

const v$ = useVuelidate(rules, { username, email, password, confirmPassword });

// Register function
const register = async () => {
    try {
        const isValid = await v$.value.$validate();
        if (!isValid) {
            console.log("Validation failed");
            return;
        }

        isLoading.value = true;

        await AuthAPI.register(username.value, email.value, password.value);

        Swal.fire({
            icon: "success",
            title: "Registration successful!",
            text: "Redirecting to login...",
            timer: 1500,
            showConfirmButton: false,
        });

        // Redirect after successful login
        setTimeout(() => router.push("/login"), 1500);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Register Failed",
            text: error.response?.data?.detail || "Something went wrong",
        });
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="register-form">
        <div class="flex flex-col items-center justify-center p-[1rem] h-[70vh]">
            <div class="bg-form w-[425px] flex flex-col h-[600px] rounded-md">
                <div class="flex flex-col items-center justify-center p-[2rem] mt-6">
                    <div class="text-white text-center">
                        <p class="font-bold text-[24px]">Create an Account</p>
                        <p class="text-[16px]">Sign up to access the chatbot</p>
                    </div>
                </div>
                <div class="flex flex-col items-center justify-center p-[2rem]" @keydown.space.prevent
                    @keyup.enter="register">
                    <!-- Username Input -->
                    <div class="mb-[1rem] flex flex-col">
                        <span class="w-[300px] flex input-field">
                            <InputText id="username" v-model="username" type="text" class="input-field-inputtext"
                                placeholder="Username" />
                        </span>
                        <small v-if="v$.username.$error" class="text-red-500 mt-1">
                            {{ v$.username.$errors[0]?.$message }}
                        </small>
                    </div>

                    <!-- Email Input -->
                    <div class="mb-[1rem] flex flex-col">
                        <span class="w-[300px] flex input-field">
                            <InputText id="email" v-model="email" type="text" class="input-field-inputtext"
                                placeholder="Email" />
                        </span>
                        <small v-if="v$.email.$error" class="text-red-500 mt-1">
                            {{ v$.email.$errors[0]?.$message }}
                        </small>
                    </div>

                    <!-- Password Input -->
                    <div class="w-[300px] flex flex-col mt-[1rem]">
                        <span class="flex w-full">
                            <Password id="password" v-model="password" toggleMask :feedback="false" class="w-full"
                                placeholder="Password" inputClass="w-full" />
                        </span>
                        <small v-if="v$.password.$error" class="text-red-500 mt-1">
                            {{ v$.password.$errors[0]?.$message }}
                        </small>
                    </div>

                    <!-- Confirm Password Input -->
                    <div class="w-[300px] flex flex-col mt-[1rem]">
                        <span class="flex w-full">
                            <Password id="confirm-password" v-model="confirmPassword" toggleMask :feedback="false"
                                class="w-full" placeholder="Confirm Password" inputClass="w-full" />
                        </span>
                        <small v-if="v$.confirmPassword.$error" class="text-red-500 mt-1">
                            {{ v$.confirmPassword.$errors[0]?.$message }}
                        </small>
                    </div>

                    <!-- Register Button -->
                    <div class="flex flex-col items-center justify-center p-[2rem]">
                        <Button label="Register" rounded outlined @click="register" :loading="isLoading"
                            class="bg-[#156896] w-[8rem] h-[3rem] text-white shadow-lg shadow-[rgba(32,28,28,0.4)] hover:shadow-lg hover:shadow-cyan-500/50" />
                        <Button class="flex mt-6 text-white" @click="router.push('/login')">Already have an account?
                            Login</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.register-form {
    position: relative;
    animation: fade-in 1s ease-out;
}

@keyframes fade-in {
    0% {
        opacity: 0;
        transform: translateY(30px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
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
