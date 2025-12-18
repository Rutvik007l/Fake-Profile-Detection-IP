async function analyze() {
    const username = document.getElementById("username").value;
    const platform = document.getElementById("platform").value;

    if(!username){ 
        alert("Enter username"); 
        return; 
    }

    const res = await fetch("/analyze", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({username, platform})
    });

    const data = await res.json();

    const out = document.getElementById("output");
    out.classList.remove("hidden");

    out.innerHTML = `
        <h3>Investigation Result</h3>
        <div class="risk"><span>Fake Probability</span><strong>${data.fake_probability}%</strong></div>
        <p><b>Verdict:</b> ${data.verdict}</p>
        <p><b>Confidence Level:</b> 🟢 ${data.confidence}</p>
        <hr>
        <h4>Detection Indicators</h4>
        <ul>${data.indicators.map(i => `<li>${i}</li>`).join("")}</ul>
        <div class="disclaimer">⚠️ ${data.accuracy_note}<br>Results are advisory and based on OSINT heuristics.</div>
    `;
}
