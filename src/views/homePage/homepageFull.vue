<script setup>
import { ref, onMounted } from "vue";
import headerTime from "../../components/header-time.vue";
import axios from "axios";
import Swal from "sweetalert2";
import Markdown from "vue3-markdown-it";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";

// API Base URL (Should be stored in .env)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const CHAT_ENDPOINT = `${API_BASE_URL}/chat/messages`;

const router = useRouter();

// Message storage
const messages = ref([]);
const isLoading = ref(false);

// Retrieve token from localStorage
let token = localStorage.getItem("access_token");

// ✅ Function to check if JWT token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const expTime = decoded.exp * 1000; // Convert to milliseconds
    console.log(decoded, expTime)
    return Date.now() >= expTime;
  } catch (error) {
    return true; // Assume expired if decoding fails
  }
};

// ✅ Fetch chat history on component mount
const fetchMessages = async () => {
  // Check if token exists
  if (!token) {
    Swal.fire({
      icon: "warning",
      title: "Unauthorized",
      text: "Please log in to continue.",
    });
    router.push("/login");
    return;
  }

  // ✅ Check if token is expired
  if (isTokenExpired(token)) {
    Swal.fire({
      icon: "error",
      title: "Session Expired",
      text: "Your session has expired. Please log in again.",
    });
    localStorage.removeItem("access_token"); // Remove expired token
    router.push("/login"); // Redirect to login page
    return;
  }

  isLoading.value = true;

  try {
    const response = await axios.get(CHAT_ENDPOINT, {
      headers: { 
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json" 
      },
      withCredentials: true,  // ✅ Important for authentication
    });

    if (response.status === 200 && response.data?.messages) {
      messages.value = response.data.messages;
    } else {
      throw new Error("Failed to load messages.");
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Could not load messages. Please try again later.",
    });
  } finally {
    isLoading.value = false;
  }
};

// Fetch messages when component mounts
onMounted(fetchMessages);
</script>

<template>
  <div class="homebg flex flex-col h-full">
    <!-- Header -->
    <header-time></header-time>

    <!-- Chat Messages -->
    <div class="chat-container">
      <div class="chat-messages">
        <div 
          v-for="(message, index) in messages" 
          :key="index" 
          class="message" 
          :class="{ user: message.role === 'user', assistant: message.role === 'assistant' }"
        >
          <Markdown :source="message.content" />
        </div>
        <div v-if="isLoading" class="message assistant">Typing...</div>
      </div>
    </div>

    <!-- Chat Input (Fixed at Bottom) -->
    <div class="chat-input-container">
      <textarea
        v-model="userMessage"
        placeholder="Type your message..."
        class="chat-input"
        @keydown.enter.exact.prevent="sendMessage"
        @keydown.enter.ctrl="addNewLine"
      ></textarea>
      <button class="send-button" @click="sendMessage" :disabled="isLoading">
        <i class="pi pi-send"></i>
      </button>
    </div>
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
  padding: 10px;
}

/* Messages List */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: rgba(255, 255, 255, 0.5) transparent; /* Firefox */
}

/* Custom Scrollbar for Chrome, Safari, Edge */
.chat-messages::-webkit-scrollbar {
  width: 6px; /* Make it thin */
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent; /* Track background */
}

.chat-messages::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.4); /* Light color */
  border-radius: 10px; /* Round edges */
  transition: background 0.3s ease-in-out;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.6); /* Slightly brighter on hover */
}

/* Chat Input Container - Centered */
.chat-input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%; /* Adjust width as needed */
  background: white;
  border-radius: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  padding: 10px;
  margin: 0 auto; /* Centers horizontally */
  margin-top: auto; /* Pushes to the bottom */
}

/* Input Field */
.chat-input {
  flex: 1;
  min-height: 40px;
  max-height: 120px;
  padding: 12px 15px;
  border: none;
  border-radius: 20px;
  outline: none;
  font-size: 16px;
  resize: none;
  overflow-y: auto;
}

/* User Message (Right-aligned) */
.user {
  align-self: flex-end;
  background-color: #156896;
  color: white;
  padding: 12px;
  border-radius: 15px;
  max-width: 75%;
  margin-bottom: 10px;
  text-align: left;
  word-wrap: break-word;
}

/* AI Message (Left-aligned) */
.assistant {
  align-self: flex-start;
  background-color: #f5f5f5;
  color: black;
  padding: 12px;
  border-radius: 15px;
  max-width: 75%;
  margin-bottom: 10px;
  text-align: left;
  word-wrap: break-word;
}

/* Send Button */
.send-button {
  background: #156896;
  border: none;
  width: 45px;
  height: 45px;
  margin-left: 10px;
  border-radius: 50%;
  color: white;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  transition: background 0.2s ease-in-out;
}

.send-button:hover {
  background: #0e4b6c;
}
</style>
