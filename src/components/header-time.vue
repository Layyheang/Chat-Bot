<script setup lang="ts">
import Swal from "sweetalert2";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AuthAPI } from "../service/configApi";

const isAuthenticated = ref(!!localStorage.getItem("access_token"));
const router = useRouter();

const logout = () => {
    Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, log me out!',
            cancelButtonText: 'No, cancel!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await AuthAPI.logout();
                    await router.push({ path: '/auth/login' });
                    Swal.fire('Logged out!', 'You have been logged out successfully.', 'success');
                } catch (error) {
                    Swal.fire('Error', 'Something went wrong while logging out.', 'error');
                }
            }
        });

};

const goToLogin = () => router.push("/login");
const goToRegister = () => router.push("/register");

</script>

<template>
    <div class="flex justify-between mb-8 bg-[rgba(254,254,255,0.1)] p-4">
        <div class="flex gap-4">
            <img style="width: 48px; height: 48px;" src="./assets/chatbot.png" alt="logo" />
            <p class="flex text-center font-bold text-white text-[16px] self-center">Expert Systems</p>
        </div>
        <div>
            <div class="flex w-full gap-4 h-full">
                <button v-if="!isAuthenticated" @click="goToLogin" class="btn">Sign In</button>
                <button v-if="!isAuthenticated" @click="goToRegister" class="btn">Sign Up</button>
                <button v-if="isAuthenticated" @click="logout" class="btn btn-logout">Logout</button>
            </div>
        </div>
    </div>

</template>
<style scoped>
.bgHeader {
    background: linear-gradient(to bottom, #78a5c9, #A7B5FF);
}

.btn {
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 8px;
    background: linear-gradient(to right, #1f6581, #156896);
    color: white;
    border: none;
    cursor: pointer;
    transition: 0.3s ease-in-out;
}

.btn:hover {
    background: linear-gradient(to right, #3b3a66, #1f6581);
    transform: scale(1.05);
}

.btn-logout {
    background: linear-gradient(to right, #d9534f, #c9302c);
}
</style>
