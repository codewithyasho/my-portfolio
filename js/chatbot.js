// CHATBOT INTEGRATED
const chatBtn = document.getElementById("chatbot-btn");
const chatContainer = document.getElementById("chatbot-container");
const closeChat = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

// Toggle Chat
chatBtn.addEventListener("click", () => {
    chatContainer.classList.toggle("hidden");
  });
  
  closeChat.addEventListener("click", () => {
    chatContainer.classList.add("hidden");
  });

// Send Message
sendBtn.onclick = sendMessage;
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  // CALL YOUR ML API HERE
  callAPI(text);
}

// Add message to UI
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = text;
  chatBody.appendChild(msg);

  chatBody.scrollTop = chatBody.scrollHeight;
}

// API CALL FUNCTION
async function callAPI(userMessage) {
  try {
    const response = await fetch("https://yashodeep2006-yashodeep-chatbot.hf.space/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: userMessage,
      }),
    });

    const data = await response.json();

    // Adjust according to your API response
    addMessage(data.answer || "No response", "bot");

  } catch (error) {
    addMessage("Error connecting to server", "bot");
    console.error(error);
  }
}