let countdownInterval;

// Reference the alarm sound directly from the HTML element
const alarmSound = document.getElementById('alarm-sound');
alarmSound.loop = true; // Make the alarm repeat

function startCountdown() {
    // Clear existing countdown if there is one
    if (countdownInterval) clearInterval(countdownInterval);

    // Hide the Stop Alarm button at the start of the countdown
    document.getElementById('stop-alarm-btn').style.display = 'none';

    // Get input values
    let hours = parseInt(document.getElementById('countdown-hours').value) || 0;
    let minutes = parseInt(document.getElementById('countdown-minutes').value) || 0;
    let seconds = parseInt(document.getElementById('countdown-seconds').value) || 0;

    // Convert all to seconds
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // Countdown display element
    const display = document.getElementById('countdown-display');

    // Countdown function
    countdownInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(countdownInterval);
            display.innerHTML = "Time's up!";
            alarmSound.play();  // Play the alarm sound from the HTML element
            document.getElementById('stop-alarm-btn').style.display = 'block'; // Show Stop Alarm button
            return;
        }

        totalSeconds--;

        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        display.innerHTML = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }, 1000);
}

// Function to stop the alarm sound
function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0; // Reset the sound to the start
    document.getElementById('stop-alarm-btn').style.display = 'none'; // Hide Stop Alarm button
}

