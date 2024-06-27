// Get the video element, buttons, canvas, and download link
const video = document.getElementById('video');
const startButton = document.getElementById('startButton');
const snapButton = document.getElementById('snapButton');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const audio1 = document.getElementById('audio1');
const audio2 = document.getElementById('audio2');

// Function to format the current date and time for the file name
function getFormattedFileName() {
    const today = new Date();
    const formattedDate = today.toLocaleDateString().replace(/\//g, '-'); // Format the date as a string
    const formattedTime = today.toLocaleTimeString().replace(/:/g, '-'); // Format the time as a string
    return formattedDate + '_' + formattedTime;
}

// Function to start the camera
async function startCamera() {
    try {
        // Request access to the user's webcam
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // Set the video source to the stream from the webcam
        video.srcObject = stream;
        // Play the start audio and update the UI
        startt();
    } catch (error) {
        console.error('Error accessing the webcam', error);
    }
}

// Function to take a photo and trigger download
function takePhotoAndDownload() {
    // Draw the current frame from the video on the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    // Create a data URL from the canvas
    const dataURL = canvas.toDataURL('image/png');
    // Create an anchor element to trigger download
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = getFormattedFileName() + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // Play the shutter sound
    audio2.play();
}

// Function to update the UI when starting the camera
function startt() {
    startButton.style.display = "none";
    snapButton.style.display = "block";
    audio1.play();
}

// Add event listeners to the buttons
startButton.addEventListener('click', startCamera);
snapButton.addEventListener('click', takePhotoAndDownload);
