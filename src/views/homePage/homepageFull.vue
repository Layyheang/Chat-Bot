<script setup>
import { ref, onMounted, nextTick } from "vue";
import headerTime from "../../components/header-time.vue";
import ChatMessages from "./components/ChatMessages.vue";
import ChatInput from "./components/ChatInput.vue";
import axios from "axios";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const CHAT_ENDPOINT = `${API_BASE_URL}/chat/messages`;

const router = useRouter();

// State
const messages = ref([]);
const isLoading = ref(false);
const userMessage = ref("");

// Retrieve token
let token = localStorage.getItem("access_token");

// Check if JWT token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return Date.now() >= decoded.exp * 1000;
  } catch (error) {
    return true;
  }
};

// Fetch chat messages
const fetchMessages = async () => {
  if (!token || isTokenExpired(token)) {
    Swal.fire({ icon: "error", title: "Session Expired", text: "Please log in again." });
    localStorage.removeItem("access_token");
    router.push("/login");
    return;
  }

  isLoading.value = true;
  try {
    const response = await axios.get(CHAT_ENDPOINT, {
      headers: { "Authorization": `Bearer ${token}` },
    });

    if (response.status === 200 && response.data?.messages) {
      messages.value = response.data.messages;
      nextTick(() => scrollToBottom());
    }
  } catch (error) {
    Swal.fire({ icon: "error", title: "Oops...", text: "Could not load messages." });
  } finally {
    isLoading.value = false;
  }
};

// Send a chat message
const sendMessage = async () => {
  if (!userMessage.value.trim()) return;

  messages.value.push({ role: "user", content: userMessage.value });

  const messageToSend = userMessage.value;
  userMessage.value = ""; // Clear input
  isLoading.value = true;

  try {
    const response = await axios.post(
      CHAT_ENDPOINT,
      { role: "user", content: messageToSend },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.data?.status === "success" && response.data?.data) {
      messages.value.push({
        role: response.data.data.role,
        content: response.data.data.content,
      });
    }
  } catch (error) {
    Swal.fire({ icon: "error", title: "Oops...", text: "Failed to send message." });
  } finally {
    isLoading.value = false;
    nextTick(() => scrollToBottom());
  }
};

// Auto-scroll to latest message
const scrollToBottom = () => {
  nextTick(() => {
    const chatContainer = document.querySelector(".chat-messages");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  });
};

onMounted(fetchMessages);
</script>

<template>
  <div class="homebg flex flex-col h-full">
    <header-time></header-time>

    <div class="chat-container">
      <ChatMessages :messages="messages" :isLoading="isLoading" />
    </div>

    <ChatInput v-model:userMessage="userMessage" @sendMessage="sendMessage" />
  </div>
</template>

<style scoped>
/* Full page container */
.homebg {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: linear-gradient(to bottom, #3b3a66, #1f6581 60%);
}

/* Chat Container */
.chat-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  padding: 0 2rem;
}
</style>
