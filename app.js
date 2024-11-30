const sendButton = document.getElementById("send-button");
const userInput = document.getElementById("user-input");
const chatMessages = document.getElementById("chat-messages");

// Fungsi untuk menampilkan pesan di layar
function displayMessage(message, isUser = false) {
  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;
  messageDiv.style.padding = "10px";
  messageDiv.style.borderRadius = "5px";
  messageDiv.style.margin = "5px 0";
  messageDiv.style.maxWidth = "80%";
  messageDiv.style.wordWrap = "break-word";
  
  if (isUser) {
    messageDiv.style.backgroundColor = "#4CAF50";
    messageDiv.style.color = "white";
    messageDiv.style.alignSelf = "flex-end";
  } else {
    messageDiv.style.backgroundColor = "#f1f1f1";
    messageDiv.style.color = "#333";
  }

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Fungsi untuk mengirim pesan ke server AI
async function getResponse(message) {
  displayMessage(message, true);

  // Simulasi API atau OpenAI
  const loadingMessage = displayMessage("Sedang memproses...", false);
  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer YOUR_API_KEY`, // Masukkan API Key di sini
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 200,
      }),
    });

    const data = await response.json();
    chatMessages.removeChild(loadingMessage);
    displayMessage(data.choices[0].text, false);
  } catch (error) {
    chatMessages.removeChild(loadingMessage);
    displayMessage("Terjadi kesalahan, coba lagi nanti!", false);
  }
}

// Event listener untuk tombol kirim
sendButton.addEventListener("click", () => {
  const message = userInput.value;
  if (message.trim()) {
    getResponse(message);
    userInput.value = "";
  }
});
        
