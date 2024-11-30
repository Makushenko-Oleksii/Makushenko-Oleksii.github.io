// Элементы плеера
const audio = document.getElementById('audio');
const playPauseBtn = document.querySelector('.play-pause-btn');
const progressBar = document.querySelector('.progress-bar');

// Функция воспроизведения/паузы
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<img src="/images/play.png" alt="Pause" width="21" height="22">' // Меняем иконку
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '<img src="/images/pause.png" alt="Pause" width="21" height="22">';
    }
});

// Обновление шкалы прогресса при воспроизведении
audio.addEventListener('timeupdate', () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
});

// Перемотка трека
progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});