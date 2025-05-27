// Инициализация Telegram WebApp
const webapp = window.Telegram.WebApp;
webapp.expand();

// Элементы камеры
const video = document.getElementById('camera');
const overlay = document.getElementById('overlay');
const labelsContainer = document.getElementById('labels-container');
const captureButton = document.getElementById('captureButton');
const switchCameraButton = document.getElementById('switchCamera');
const flashButton = document.getElementById('flashButton');

// Настройки камеры
let currentStream = null;
let facingMode = 'environment'; // Начинаем с задней камеры
const constraints = {
    video: {
        facingMode,
        width: { ideal: 1920 },
        height: { ideal: 1080 }
    },
    audio: false
};

// Инициализация камеры
async function initCamera() {
    try {
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
        }
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        currentStream = stream;
        video.srcObject = stream;
        
        // Ждем, пока видео будет готово
        await new Promise(resolve => {
            video.onloadedmetadata = () => {
                resolve();
            };
        });
        
        // Запускаем распознавание еды
        startFoodDetection();
    } catch (err) {
        console.error('Ошибка доступа к камере:', err);
        alert('Ошибка доступа к камере. Пожалуйста, убедитесь, что вы разрешили доступ к камере.');
    }
}

// Переключение камеры
switchCameraButton.addEventListener('click', () => {
    facingMode = facingMode === 'environment' ? 'user' : 'environment';
    constraints.video.facingMode = facingMode;
    initCamera();
});

// Захват фото
captureButton.addEventListener('click', async () => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    // Конвертируем в blob
    const blob = await new Promise(resolve => {
        canvas.toBlob(resolve, 'image/jpeg', 0.8);
    });
    
    // Отправляем в Telegram
    webapp.sendData(blob);
});

// Распознавание еды (демо-версия)
function startFoodDetection() {
    // В реальной реализации здесь будет использоваться TensorFlow.js или аналогичная библиотека
    // для распознавания еды в реальном времени. Для демонстрации добавим статичные метки.
    const demoLabels = [
        { text: 'Лосось', x: 50, y: 30 },
        { text: 'Рукола', x: 30, y: 60 },
        { text: 'Яйцо пашот', x: 50, y: 50 },
        { text: 'Тост с авокадо', x: 70, y: 40 }
    ];
    
    labelsContainer.innerHTML = '';
    demoLabels.forEach(label => {
        const div = document.createElement('div');
        div.className = 'food-label';
        div.textContent = label.text;
        div.style.left = `${label.x}%`;
        div.style.top = `${label.y}%`;
        labelsContainer.appendChild(div);
    });
}

// Запускаем приложение
initCamera(); 