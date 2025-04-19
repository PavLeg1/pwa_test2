// Регистрация Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/pwa_test/sw.js');
      console.log('ServiceWorker registration successful:', registration);
      
      // Проверка оффлайн-статуса при загрузке
      if (!navigator.onLine) {
        showOfflineNotification();
      }
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
    }
  });
}

// Обработчики изменения сетевого статуса
window.addEventListener('online', () => {
  hideOfflineNotification();
  console.log('You are now online!');
});

window.addEventListener('offline', () => {
  showOfflineNotification();
  console.log('You are now offline!');
});

// Функции для уведомлений
function showOfflineNotification() {
  const offlineNotification = document.createElement('div');
  offlineNotification.id = 'offline-notification';
  offlineNotification.innerHTML = `
    <div class="offline-banner">
      <p>Вы в оффлайн-режиме. Некоторые функции могут быть недоступны.</p>
    </div>
  `;
  document.body.prepend(offlineNotification);
}

function hideOfflineNotification() {
  const notification = document.getElementById('offline-notification');
  if (notification) {
    notification.remove();
  }
}



// Обработка кнопок для показа QR-кодов
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.qr-button');
  
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const qrType = button.getAttribute('data-qr');
      const qrElement = document.getElementById(`${qrType}-qr`);
      const isCurrentlyShown = qrElement.style.display === 'block';
      
      // Скрываем все QR-коды
      document.querySelectorAll('.qr-item').forEach(item => {
        item.style.display = 'none';
      });
      
      // Если QR не был показан, показываем его
      if (!isCurrentlyShown) {
        qrElement.style.display = 'block';
      }
      
      // Обновляем текст всех кнопок
      buttons.forEach(btn => {
        const btnQrType = btn.getAttribute('data-qr');
        const isActive = btnQrType === qrType && !isCurrentlyShown;
        
        btn.textContent = getButtonText(btnQrType, isActive);
      });
    });
  });
});

// Функция для генерации текста кнопки
function getButtonText(qrType, isActive) {
  const qrNames = {
    'phone': 'номера телефона',
    'tg': 'Telegram',
    'wechat': 'WeChat'
  };
  
  return `${isActive ? 'Скрыть' : 'Показать'} QR ${qrNames[qrType]}`;
}

// // Остальной код (Service Worker и проверка онлайн-статуса) остается без изменений
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('sw.js')
//       .then(registration => {
//         console.log('ServiceWorker registration successful with scope: ', registration.scope);
//       })
//       .catch(err => {
//         console.log('ServiceWorker registration failed: ', err);
//       });
//   });
// }

// window.addEventListener('online', () => {
//   console.log('You are now online!');
// });

// window.addEventListener('offline', () => {
//   console.log('You are now offline!');
// });

// if (!navigator.onLine) {
//   console.log('Started in offline mode');
// }