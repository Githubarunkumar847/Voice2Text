let isRecording = false;
let recognition;

// Check browser support for Speech Recognition
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.continuous = false;

    const micButton = document.getElementById('start-recording');
    const transcriptionBox = document.getElementById('transcription');

    micButton.addEventListener('click', () => {
        if (!isRecording) {
            isRecording = true;
            micButton.innerHTML = '🛑'; // Stop recording icon
            micButton.style.backgroundColor = '#e91e63'; // Stop button color
            recognition.start();
        } else {
            isRecording = false;
            micButton.innerHTML = '🎙️'; // Mic icon
            micButton.style.backgroundColor = '#4c66a4'; // Original button color
            recognition.stop();
        }
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        transcriptionBox.value += transcript + ' ';
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        isRecording = false;
        micButton.innerHTML = '🎙️'; // Reset mic button
        micButton.style.backgroundColor = '#4c66a4'; // Reset color
    };

    recognition.onend = () => {
        isRecording = false;
        micButton.innerHTML = '🎙️'; // Reset mic button
        micButton.style.backgroundColor = '#4c66a4'; // Reset color
    };
} else {
    alert('Your browser does not support Speech Recognition. Please try with Chrome.');
}

function copyText() {
    const transcriptionBox = document.getElementById('transcription');
    transcriptionBox.select();
    document.execCommand('copy');
    alert('Text copied to clipboard!');
}
