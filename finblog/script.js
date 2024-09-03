document.addEventListener('DOMContentLoaded', () => {
    // Funktion, um Parameter aus der URL zu holen
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Blog-Einträge laden
    fetch('posts.json')
        .then(response => response.json())
        .then(data => {
            // Holen der aktuellen Beitrag-ID aus der URL, Standardwert ist 0
            let postId = parseInt(getQueryParam('p')) || 0;

            // Begrenzung auf gültigen Bereich der Einträge
            postId = Math.max(0, Math.min(postId, data.length - 1));

            const post = data[postId];
            document.getElementById('blog-title').textContent = post.title + ' - Finanzen Blog';
            document.getElementById('header-image').src = post.headerImage;
            document.getElementById('header-image').alt = post.title;
            document.getElementById('post-title').textContent = post.title;
            document.getElementById('post-date').textContent = post.date;
            document.getElementById('post-content').innerHTML = post.content;

            // Navigation Buttons
            const prevButton = document.getElementById('prev-post');
            const nextButton = document.getElementById('next-post');

            prevButton.disabled = postId <= 0;
            nextButton.disabled = postId >= data.length - 1;

            prevButton.onclick = () => {
                if (postId > 0) {
                    window.location.href = `?p=${postId - 1}`;
                }
            };

            nextButton.onclick = () => {
                if (postId < data.length - 1) {
                    window.location.href = `?p=${postId + 1}`;
                }
            };
			
			
        });
});
