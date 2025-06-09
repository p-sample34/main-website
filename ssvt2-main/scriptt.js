// JavaScript to handle images, videos, and YouTube links with popup functionality
document.querySelectorAll('.gallery-media, .youtube-link').forEach(item => {
    item.addEventListener('click', function() {
        const popup = document.createElement('div');
        popup.classList.add('popup');

        let mediaElement;

        if (item.classList.contains('youtube-link')) {
            // Handle YouTube URL
            const url = item.getAttribute('data-url');
            const videoId = extractYouTubeID(url);

            if (videoId) {
                mediaElement = document.createElement('iframe');
                mediaElement.src = `https://www.youtube.com/embed/${videoId}`;
                mediaElement.frameBorder = "0";
                mediaElement.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                mediaElement.allowFullscreen = true;
            }
        } else if (item.tagName === 'IMG') {
            // Handle images
            mediaElement = document.createElement('img');
            mediaElement.src = item.src;
        } else if (item.tagName === 'VIDEO') {
            // Handle videos
            mediaElement = document.createElement('video');
            mediaElement.src = item.querySelector('source').src;
            mediaElement.controls = true;
        }

        if (mediaElement) {
            popup.appendChild(mediaElement);
            document.body.appendChild(popup);

            // Close the popup when clicked
            popup.addEventListener('click', function() {
                document.body.removeChild(popup);
            });
        }
    });
});

// Function to extract YouTube video ID from various URL formats
function extractYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}
