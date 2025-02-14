document.getElementById("generateBtn").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value;
    const outputDiv = document.getElementById("output");

    outputDiv.innerHTML = "⏳ Generating response...";

    try {
        const response = await fetch("http://localhost:5000/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: userInput })
        });

        const data = await response.json();
        outputDiv.innerHTML = data.result || "❌ Error generating response!";
    } catch (error) {
        outputDiv.innerHTML = "⚠️ Failed to connect to server!";
    }
});
