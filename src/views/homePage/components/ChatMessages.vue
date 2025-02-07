<script setup>
import Markdown from "vue3-markdown-it";
import "highlight.js/styles/github-dark.css";
import hljs from "highlight.js";

// Define props
defineProps(["messages", "isLoading"]);

// ✅ Function to apply syntax highlighting
const markdownOptions = {
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return `<pre class="hljs language-${lang}"><code>${hljs.highlight(code, { language: lang }).value}</code></pre>`;
    }
    return `<pre class="hljs"><code>${code}</code></pre>`;
  },
};
</script>

<template>
    <div class="chat-messages">
      <div 
        v-for="(message, index) in messages.slice().reverse()" 
        :key="index" 
        class="message" 
        :class="{ user: message.role === 'user', assistant: message.role === 'assistant' }"
      >
        <Markdown :source="message.content" v-bind="markdownOptions" :breaks="true" :html="true" />
      </div>
      <div v-if="isLoading" class="message assistant">Typing...</div>
    </div>
  </template>

<style scoped>
/* Chat Container */
.chat-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  padding: 0 2rem;
}

/* Messages List */
.chat-messages {
  flex: 1;
  overflow-y: auto; /* Allows scrolling */
  padding: 15px;
  display: flex;
  flex-direction: column-reverse; /* Ensures latest messages appear at bottom */
  
  /* ✅ Hide Scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE & Edge */
}

.chat-messages::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
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

/* ✅ Syntax Highlighting */
.message :deep(pre) {
  background-color: #1e1e1e;
  color: #ffffff;
  padding: 10px;
  margin: 1rem 0;
  border-radius: 5px;
  overflow-x: auto;
  font-family: "Courier New", monospace;
}

.message :deep(code) {
  font-family: "Courier New", monospace;
  background: rgba(0, 0, 0, 0.1);
  padding: 2px 4px;
  border-radius: 4px;
}

/* ✅ Highlight.js Code Block */
.hljs {
  background: #1e1e1e !important;
  padding: 12px;
  border-radius: 8px;
  overflow-x: auto;
}

.hljs.language-python {
  color: #ffcc66; /* Adjust for Python syntax */
}
</style>