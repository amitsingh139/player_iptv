// Replace with the URL of the .m3u file on GitHub
const m3uFileUrl = 'Darshan@TataPlay.m3u';

// Create an HTML video element
const video = document.createElement('video');
video.controls = true; // Show video controls

// Append the video element to the document body
document.body.appendChild(video);

// Load the .m3u file and play the live stream
fetch(m3uFileUrl)
  .then(response => response.text())
  .then(data => {
    const streamUrl = data.trim(); // Get the first URL in the .m3u playlist
    video.src = streamUrl;
    video.play();
  })
  .catch(error => {
    console.error('Error loading .m3u file:', error);
  });
