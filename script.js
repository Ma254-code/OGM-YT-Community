document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'DEIN_API_KEY_HIER'; // <<< Ersetze das hier
    const channelId = 'UCgWo7koDNf6X6GvPYKAzDFA';
    const maxResults = 1;

    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const latestVideo = data.items[0];
            const videoId = latestVideo.id.videoId;
            const videoLink = `https://www.youtube.com/watch?v=${videoId}`;

            const linkElement = document.getElementById("latestVideoLink");
            linkElement.innerHTML = `<a href="${videoLink}" target="_blank" class="btn">▶️ Neuestes Video ansehen</a>`;
        })
        .catch(error => {
            console.error("Fehler beim Laden des Videos:", error);
            document.getElementById("latestVideoLink").textContent = "Video konnte nicht geladen werden.";
        });
});


