// Элементы плеера
const audio = document.querySelector('audio');
const playPauseBtn = document.querySelector('.play-pause-btn');
const progressBar = document.querySelector('.progress-bar');
const volumeControl = document.querySelector('.volume-control');
const volumePercentage = document.querySelector('.volume-percentage');


// Установка громкости по умолчанию
audio.volume = 0.5; // Громкость аудио 50%
volumeControl.value = 0.5; // Устанавливаем ползунок громкости на середину
volumePercentage.textContent = '50%'; // Отображаем 50%

// Функция воспроизведения/паузы
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<img src="/images/pause.png" alt="Pause" width="21" height="22">';
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '<img src="/images/play.png" alt="Play" width="21" height="22">';
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

// Регулировка громкости
volumeControl.addEventListener('input', (event) => {
    audio.volume = event.target.value; // Устанавливаем громкость от 0 до 1
    const volumePercent = Math.round(event.target.value * 100); // Преобразуем в проценты
    volumePercentage.textContent = `${volumePercent}%`; // Обновляем текст
});




// Элементы времени
const currentTimeEl = document.querySelector('.current-time');
const remainingTimeEl = document.querySelector('.remaining-time');

// Форматирование времени
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

// Установка общего времени трека при загрузке
audio.addEventListener('loadedmetadata', () => {
    remainingTimeEl.textContent = formatTime(audio.duration); // Устанавливаем общее время
});

// Обновление времени и прогресса при воспроизведении
audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime; // Текущее время
    const remainingTime = audio.duration - currentTime; // Оставшееся время

    currentTimeEl.textContent = formatTime(currentTime); // Обновляем текущее время
    remainingTimeEl.textContent = formatTime(remainingTime); // Обновляем оставшееся время

    progressBar.value = (currentTime / audio.duration) * 100; // Обновляем шкалу прогресса
});