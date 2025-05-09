document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'AIzaSyAxavMePUTJFVM5_dtGLYn1rXJu6mfXd7o'; // 👈 Deinen YouTube Data API Key hier einfügen
    const channelId = 'UCgWo7koDNf6X6GvPYKAzDFA'; // OGM-YT Channel-ID
    const maxResults = 1;

    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("API Antwort:", data); // 👈 Zeigt die komplette API-Antwort in der Browser-Konsole

            if (!data.items || data.items.length === 0) {
                document.getElementById("latestVideoLink").textContent = "Kein Video gefunden oder API-Fehler.";
                return;
            }

            const latestVideo = data.items[0];

            // Falls es kein Video ist (z. B. ein Community-Post)
            if (!latestVideo.id || !latestVideo.id.videoId) {
                document.getElementById("latestVideoLink").textContent = "Kein gültiges Video gefunden.";
                return;
            }

            const videoId = latestVideo.id.videoId;
            const videoLink = `https://www.youtube.com/watch?v=${videoId}`;

            const linkElement = document.getElementById("latestVideoLink");
            linkElement.innerHTML = `<a href="${videoLink}" target="_blank" class="btn">▶️ Neuestes Video ansehen</a>`;
        })
        .catch(error => {
            console.error("Fehler beim Laden des Videos:", error);
            document.getElementById("latestVideoLink").textContent = "Fehler beim Abrufen des Videos.";
        });
});
