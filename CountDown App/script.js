let countdown = null;
let endTime = null;
let totalDuration = 0;

function startTimer() {
    if (countdown) return;
    
    const days = parseInt(document.getElementById('daysInput').value) || 0;
    const hours = Math.min(parseInt(document.getElementById('hoursInput').value) || 0, 23);
    const minutes = Math.min(parseInt(document.getElementById('minutesInput').value) || 0, 59);
    const seconds = Math.min(parseInt(document.getElementById('secondsInput').value) || 0, 59);

    totalDuration = (days * 86400) + (hours * 3600) + (minutes * 60) + seconds;
    if (totalDuration <= 0) return;

    endTime = Date.now() + totalDuration * 1000;
    updateProgress(100);
    
    countdown = setInterval(() => {
        const currentTime = Date.now();
        const remaining = Math.max(0, endTime - currentTime);
        const remainingSeconds = Math.ceil(remaining / 1000);
        
        if (remaining <= 0) {
            clearInterval(countdown);
            countdown = null;
            handleTimerEnd();
            return;
        }

        updateDisplay(remainingSeconds);
        updateProgress((remaining / (totalDuration * 1000)) * 100);
    }, 100);
}

function resetTimer() {
    clearInterval(countdown);
    countdown = null;
    document.getElementById('daysInput').value = '';
    document.getElementById('hoursInput').value = '';
    document.getElementById('minutesInput').value = '';
    document.getElementById('secondsInput').value = '';
    updateDisplay(0);
    updateProgress(0);
}

function updateDisplay(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = secs.toString().padStart(2, '0');
}

function updateProgress(percentage) {
    document.getElementById('progress').style.width = `${100 - percentage}%`;
}

function handleTimerEnd() {
    updateDisplay(0);
    updateProgress(0);
    alert('Timer Completed!');
    
}


document.querySelectorAll('.time-input').forEach(input => {
    input.addEventListener('input', (e) => {
        const max = parseInt(e.target.max) || Infinity;
        const value = parseInt(e.target.value) || 0;
        if (value > max) e.target.value = max;
        if (value < 0) e.target.value = 0;
    });
});