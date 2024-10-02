import { doctors } from './data.js'; // Імпорт масиву лікарів з файлу data.js

let selected_doctors = [...doctors]; // Копіюємо масив лікарів для подальшої роботи
const itemsWrapper = document.getElementById('ItemsWrapper'); // Отримуємо контейнер для відображення лікарів
const template = document.getElementById('item-template'); // Отримуємо шаблон для лікаря
const doctorPopup = document.getElementById("doctorPopup"); // Отримуємо попап для додавання/редагування лікарів
const overlay = document.getElementById("overlay"); // Отримуємо затемнення для попапа
const doctorForm = document.getElementById("doctorForm"); // Отримуємо форму для введення даних лікаря

let isEditing = false; // Відзначає, чи відбувається редагування лікаря
let currentDoctorIndex = null; // Індекс лікаря, який редагується

// Функція для додавання лікарів на сторінку
const addDoctorsToPage = (array) => {
    itemsWrapper.innerHTML = ''; // Очищуємо контейнер від попередніх елементів

    // Додаємо нові елементи лікарів
    array.forEach((doctor, index) => {
        const clone = template.content.cloneNode(true); // Клонуємо шаблон
        clone.querySelector('#avatar').style.backgroundImage = `url(${doctor.img})`; // Встановлюємо зображення лікаря
        clone.querySelector('#name').innerText = doctor.name; // Встановлюємо ім'я лікаря
        clone.querySelector('#specialization').innerText = doctor.description; // Встановлюємо спеціалізацію
        clone.querySelector('#last-update').innerText = doctor.last_updated; // Встановлюємо дату останнього оновлення
        clone.querySelector('#price').innerText = `${doctor.price}$`; // Встановлюємо ціну

        // Додаємо функціонал для редагування та видалення
        clone.querySelector(".manage button:first-child").addEventListener("click", () => {
            openPopup(); // Відкриваємо попап для редагування
            loadDoctorIntoForm(doctor, index); // Завантажуємо дані лікаря в форму
        });

        clone.querySelector(".manage button:last-child").addEventListener("click", () => {
            removeDoctor(index); // Видаляємо лікаря з списку
        });

        itemsWrapper.appendChild(clone); // Додаємо клони до контейнера
    });
};

// Функція для фільтрації лікарів за пошуковим запитом
function filterDoctors(searchTerm) {
    return doctors.filter(doctor =>
        doctor.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
        doctor.description.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
    );
}

// Функція для обчислення загальної вартості послуг вибраних лікарів
function calculateTotalPrice() {
    const totalPrice = selected_doctors.reduce((sum, doctor) => sum + doctor.price, 0);
    document.getElementById('total_price').textContent = `${totalPrice.toString()} $`; // Виводимо загальну вартість
}

// Функція для сортування лікарів за вибраною категорією
function sortByCategory(sortBy) {
    if (sortBy === 'price') {
        return selected_doctors.slice().sort((a, b) => a.price - b.price); // Сортуємо за ціною
    } else if (sortBy === 'name') {
        return selected_doctors.slice().sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })); // Сортуємо за ім'ям
    }
    return selected_doctors; // Повертаємо оригінальний масив, якщо не вказано сортировку
}

// Функція для відкриття попапа
function openPopup() {
    doctorPopup.style.display = "block"; // Показуємо попап
    overlay.style.display = "block"; // Показуємо затемнення
    clearForm(); // Очищаємо форму
}

// Функція для закриття попапа
function closePopup() {
    doctorPopup.style.display = "none"; // Сховуємо попап
    overlay.style.display = "none"; // Сховуємо затемнення
    isEditing = false; // Скидаємо статус редагування
}

// Очищення форми після закриття попапа
function clearForm() {
    doctorForm.reset(); // Скидаємо форму
    document.getElementById("popupTitle").innerText = "Add Doctor"; // Встановлюємо заголовок
}

// Завантаження даних лікаря у форму для редагування
function loadDoctorIntoForm(doctorData, index) {
    isEditing = true; // Встановлюємо статус редагування
    currentDoctorIndex = index; // Зберігаємо індекс лікаря
    document.getElementById("popupTitle").innerText = "Edit Doctor"; // Встановлюємо заголовок редагування
    document.getElementById("doctorName").value = doctorData.name; // Встановлюємо ім'я лікаря у формі
    document.getElementById("doctorDescription").value = doctorData.description; // Встановлюємо опис лікаря у формі
    document.getElementById("doctorPrice").value = doctorData.price; // Встановлюємо ціну лікаря у формі
    document.getElementById("doctorImage").value = doctorData.img; // Встановлюємо зображення лікаря у формі
}

// Видалення лікаря зі списку
function removeDoctor(index) {
    selected_doctors.splice(index, 1); // Видаляємо лікаря за індексом
    addDoctorsToPage(selected_doctors); // Оновлюємо відображення лікарів
}

// Обробка події відправки форми для додавання або редагування лікаря
doctorForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Запобігаємо перезавантаженню сторінки

    const doctorData = {
        name: document.getElementById("doctorName").value, // Збираємо дані лікаря з форми
        description: document.getElementById("doctorDescription").value,
        price: parseFloat(document.getElementById("doctorPrice").value),
        img: document.getElementById("doctorImage").value,
        last_updated: new Date().toLocaleString(), // Отримуємо поточний час
    };

    if (isEditing && currentDoctorIndex !== null) {
        // Якщо редагуємо лікаря, оновлюємо дані без зміни last_updated
        selected_doctors[currentDoctorIndex] = {
            ...selected_doctors[currentDoctorIndex], // Зберігаємо попередні дані
            ...doctorData, // Оновлюємо нові дані
            last_updated: selected_doctors[currentDoctorIndex].last_updated // Залишаємо останнє оновлення без змін
        };
    } else {
        // Якщо додаємо нового лікаря, добавляємо new doctorData
        selected_doctors.push(doctorData);
    }

    addDoctorsToPage(selected_doctors); // Оновлюємо відображення лікарів
    closePopup(); // Закриваємо попап
});


// Обробка події пошуку та сортування лікарів
document.querySelector('.search-menu').addEventListener('submit', function (event) {
    event.preventDefault(); // Запобігаємо перезавантаженню сторінки
    const searchTerm = event.target.querySelector('input').value; // Отримуємо пошуковий запит

    if (searchTerm !== '') {
        selected_doctors = filterDoctors(searchTerm); // Фільтруємо лікарів за запитом
    } else {
        selected_doctors = doctors; // Якщо запит порожній, повертаємо всіх лікарів
    }

    const selected_value = document.getElementById('sort').value; // Отримуємо значення сортування
    addDoctorsToPage(sortByCategory(selected_value !== 'Choose one...' ? selected_value : 'name')); // Сортуємо та відображаємо лікарів
});

// Обробка події зміни сортування
document.getElementById('sort').addEventListener('change', function (event) {
    const sortBy = event.target.value; // Отримуємо вибране значення для сортування
    addDoctorsToPage(sortByCategory(sortBy)); // Сортуємо та відображаємо лікарів
});

// Обробка події для обчислення загальної вартості
document.querySelector('.item-count-button').addEventListener('click', function (event) {
    event.preventDefault(); // Запобігаємо перезавантаженню сторінки
    calculateTotalPrice(); // Обчислюємо загальну вартість
});

// Обробка подій для відкриття та закриття попапа
document.getElementById("openPopup").addEventListener("click", openPopup); // Відкриваємо попап
overlay.addEventListener("click", closePopup); // Закриваємо попап при натисканні на затемнення

// Початкове завантаження лікарів на сторінку
addDoctorsToPage(selected_doctors);
