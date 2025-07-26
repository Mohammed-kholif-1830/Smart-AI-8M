const apiKey = "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";

async function askAI() {
  const question = document.getElementById("question").value.trim();
  const responseDiv = document.getElementById("response");
  const responseCard = document.getElementById("response-card");

  if (!question) {
    responseCard.style.display = "block";
    responseDiv.innerHTML = "من فضلك اكتب سؤالًا أولاً.";
    return;
  }

  responseCard.style.display = "block";
  responseDiv.innerHTML = "جاري التحميل...";

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
        temperature: 0.7
      })
    });

    const data = await res.json();

    if (data.choices && data.choices.length > 0) {
      responseDiv.innerHTML = data.choices[0].message.content;
    } else if (data.error) {
      responseDiv.innerHTML = `خطأ: ${data.error.message}`;
    } else {
      responseDiv.innerHTML = "لم أتمكن من الرد، حاول مرة أخرى.";
    }
  } catch (err) {
    console.error(err);
    responseDiv.innerHTML = "حدث خطأ أثناء الاتصال بالخادم.";
  }
}

function copyResponse() {
  const responseText = document.getElementById("response").innerText;
  navigator.clipboard.writeText(responseText)
    .then(() => alert("تم نسخ الرد!"))
    .catch(() => alert("حدث خطأ أثناء النسخ"));
}

function clearAll() {
  document.getElementById("question").value = "";
  document.getElementById("response").innerHTML = "";
  document.getElementById("response-card").style.display = "none";
}