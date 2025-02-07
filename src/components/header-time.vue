<script setup lang="ts">
import Swal from "sweetalert2";
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { AuthAPI } from "../service/configApi";
import { jwtDecode } from "jwt-decode";

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const CHAT_CLEAR_ENDPOINT = `${API_BASE_URL}/chat/messages/clear`;

const router = useRouter();
const route = useRoute();

// ✅ Check if user is authenticated
const isAuthenticated = ref(!!localStorage.getItem("access_token"));

// ✅ Check if the current page is "/"
const isHomePage = computed(() => route.path === "/");

// ✅ Function to check if JWT token is expired
const isTokenExpired = (token: string) => {
    try {
        const decoded = jwtDecode(token);
        return Date.now() >= decoded.exp * 1000;
    } catch (error) {
        return true;
    }
};

// ✅ Logout Function
const logout = () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, log me out!",
        cancelButtonText: "No, cancel!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await AuthAPI.logout();
                localStorage.removeItem("access_token"); // Remove token
                isAuthenticated.value = false; // Update authentication status
                await router.push({ path: "/auth/login" });
                Swal.fire("Logged out!", "You have been logged out successfully.", "success");
            } catch (error) {
                Swal.fire("Error", "Something went wrong while logging out.", "error");
            }
        }
    });
};

// ✅ Delete Chat Function
const deleteChat = async () => {
    Swal.fire({
        title: "Delete All Messages?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete all!",
        cancelButtonText: "No, cancel!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                // Retrieve token
                let token = localStorage.getItem("access_token");

                // Handle expired token
                if (!token || isTokenExpired(token)) {
                    Swal.fire({ icon: "error", title: "Session Expired", text: "Please log in again." });
                    localStorage.removeItem("access_token");
                    isAuthenticated.value = false;
                    router.push("/login");
                    return;
                }

                // Show loading state
                Swal.fire({
                    title: "Deleting...",
                    text: "Please wait while chat messages are being deleted.",
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    willOpen: () => Swal.showLoading(),
                });

                await axios.post(CHAT_CLEAR_ENDPOINT, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                Swal.fire("Deleted!", "All chat messages have been cleared.", "success");
                window.location.reload(); // Refresh the page after clearing messages
            } catch (error) {
                Swal.fire("Error", "Failed to delete chat messages.", "error");
            }
        }
    });
};

// ✅ Redirect Functions
const goToLogin = () => router.push("/login");
const goToRegister = () => router.push("/register");
</script>

<template>
    <div class="flex justify-between bg-[rgba(254,254,255,0.1)] p-4">
        <router-link to="/" class="flex gap-4 cursor-pointer">
            <img style="width: 48px; height: 48px;" src="./assets/chatbot.png" alt="logo" />
            <p class="flex text-center font-bold text-white text-[16px] self-center">
                Expert Systems
            </p>
        </router-link>
        <div>
            <div class="flex w-full gap-4 h-full">
                <button v-if="!isAuthenticated" @click="goToLogin" class="btn">Sign In</button>
                <button v-if="!isAuthenticated" @click="goToRegister" class="btn">Sign Up</button>

                <!-- ✅ Show "Delete Chat" Button only on "/" -->
                <button v-if="isAuthenticated && isHomePage" @click="deleteChat" class="btn btn-delete">
                    Delete Chat
                </button>

                <button v-if="isAuthenticated" @click="logout" class="btn btn-logout">
                    Logout
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bgHeader {
    background: linear-gradient(to bottom, #78a5c9, #A7B5FF);
}

.btn {
    padding: 10px 15px;
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

/* ✅ Delete Chat Button */
.btn-delete {
    background: linear-gradient(to right, #f39c12, #e67e22);
}

.btn-delete:hover {
    background: linear-gradient(to right, #d35400, #e67e22);
}

/* ✅ Logout Button */
.btn-logout {
    background: linear-gradient(to right, #d9534f, #c9302c);
}
</style>
