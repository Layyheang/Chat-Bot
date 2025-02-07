<script setup>
import { ref } from "vue";

defineProps(["userMessage", "sendMessage"]);
const emit = defineEmits(["update:userMessage", "sendMessage"]);

const onInputChange = (event) => {
    emit("update:userMessage", event.target.value);
};

const onSendMessage = () => {
    emit("sendMessage");
};
</script>

<template>
    <div class="m-2">
        <div class="chat-input-container">
            <textarea :value="userMessage" placeholder="Type your message..." class="chat-input" @input="onInputChange"
                @keydown.enter.exact.prevent="onSendMessage"></textarea>
            <button class="send-button" @click="onSendMessage">
                <i class="pi pi-send"></i>
            </button>
        </div>
    </div>
</template>

<style scoped>
/* Chat Input Container - Centered */
.chat-input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    /* Adjust width as needed */
    background: white;
    border-radius: 30px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
    padding: 10px;
    margin: 0 auto;
    /* Centers horizontally */
    margin-top: auto;
    /* Pushes to the bottom */
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
}

.send-button:hover {
    background: #0e4b6c;
}
</style>
