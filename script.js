// Прокрутка к нужному блоку
function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    window.scrollTo({
      top: el.offsetTop - 60, // учёт высоты шапки
      behavior: "smooth"
    });
  }
}

// Глобальные переменные для карусели
let currentImages = [];       // Массив URL фотографий
let currentImageIndex = 0;    // Текущий индекс
let currentTitle = '';        // Заголовок экскурсии (для формы)
let currentInfo = '';         // Текст экскурсии (для формы)

/**
 * Открыть модалку: 
 * @param {string} title   - Заголовок экскурсии
 * @param {string} info    - Текст описания
 * @param {array}  images  - Массив URL картинок
 */
function openDetailsModal(title, info, images) {
  currentTitle = title;
  currentInfo = info;
  currentImages = images || [];
  currentImageIndex = 0;

  // Наполняем модалку
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalInfo').textContent = info;
  
  // Если картинок нет, скрываем карусель
  if (!images || images.length === 0) {
    document.getElementById('carouselContainer').style.display = 'none';
  } else {
    document.getElementById('carouselContainer').style.display = 'block';
    showImage(0);
  }

  // Сброс формы
  resetFormFields();

  // Отображаем
  const overlay = document.getElementById('detailsModal');
  overlay.style.display = 'flex';

  // Можно добавить класс .show для анимации bottom-sheet
  // document.getElementById('modalContent').classList.add('show');
}

/**
 * Закрыть модалку
 */
function closeDetailsModal() {
  const overlay = document.getElementById('detailsModal');
  overlay.style.display = 'none';

  // Удаляем класс .show, если используем анимации bottom-sheet
  // document.getElementById('modalContent').classList.remove('show');
}

/**
 * Сброс значений формы
 */
function resetFormFields() {
  document.getElementById('dateField').value = '';
  document.getElementById('timeField').value = '12:00';
  document.getElementById('nameField').value = '';
  document.getElementById('phoneField').value = '';
  document.getElementById('peopleField').value = '1';

  // Сбрасываем активную кнопку людей
  const buttons = document.querySelectorAll('.people-buttons button');
  buttons.forEach((btn, index) => {
    if (index === 0) btn.classList.add('active'); // кнопка "1"
    else btn.classList.remove('active');
  });
}

/**
 * Выбор количества людей
 */
function selectPeople(value) {
  document.getElementById('peopleField').value = value;
  const buttons = document.querySelectorAll('.people-buttons button');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent === String(value)) {
      btn.classList.add('active');
    }
  });
}

/**
 * Отправка формы
 */
function submitForm(e) {
  e.preventDefault();

  // Можно добавить AJAX/FETCH для отправки на сервер
  alert(
    'Заявка отправлена!\n\n' + 
    'Экскурсия: ' + currentTitle + '\n' +
    'Дата: ' + document.getElementById('dateField').value + '\n' +
    'Время: ' + document.getElementById('timeField').value + '\n' +
    'Имя: ' + document.getElementById('nameField').value + '\n' +
    'Телефон: ' + document.getElementById('phoneField').value + '\n' +
    'Кол-во человек: ' + document.getElementById('peopleField').value
  );

  closeDetailsModal();
}

/* ================
   КАРУСЕЛЬ
================ */
function showImage(index) {
  // Предохраняемся от выхода за границы
  if (index < 0) index = currentImages.length - 1;
  if (index >= currentImages.length) index = 0;

  currentImageIndex = index;
  const imageElem = document.getElementById('carouselImage');
  imageElem.src = currentImages[currentImageIndex];
}

/**
 * Следующее фото
 */
function nextImage() {
  showImage(currentImageIndex + 1);
}

/**
 * Предыдущее фото
 */
function prevImage() {
  showImage(currentImageIndex - 1);
}

/* ================
   АНИМАЦИИ ПРИ ПРОКРУТКЕ
================ */
window.addEventListener('scroll', revealOnScroll);

function revealOnScroll() {
  // Все элементы с классом .fade-up
  const fadeElems = document.querySelectorAll('.fade-up');
  const windowHeight = window.innerHeight;

  fadeElems.forEach(el => {
    const rect = el.getBoundingClientRect();
    // Если элемент хотя бы на 100px появился в зоне видимости
    if (rect.top < windowHeight - 100) {
      el.classList.add('show');
    }
  });
}

// При загрузке страницы
revealOnScroll();