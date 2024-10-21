let selected_doctors = [];
let selected_order_by = '';
let selected_search_term = '';
let edited_doctor_id = null;

// Функція для отримання лікарів з бекенду
function fetchDoctors() {
    let url = `http://127.0.0.1:8000/doctors?`;
    if (selected_search_term !== '') {
        url += `&search=${selected_search_term}`;
    }
    if (selected_order_by !== '') {
        url += `&order_by=${selected_order_by}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            selected_doctors = data;
            addDoctorsToPage(selected_doctors);
        })
        .catch(error => console.error('Error fetching doctors:', error));
}

// Функція для додавання лікаря
function fetchAddDoctor(doctor) {
    fetch('http://127.0.0.1:8000/doctors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doctor)
    })
        .then(() => {
            fetchDoctors();
        })
        .catch(error => console.error('Error adding doctor:', error));
}

// Функція для видалення лікаря
function fetchDeleteDoctor(doctorId) {
    fetch(`http://127.0.0.1:8000/doctors/${doctorId}`, {
        method: 'DELETE'
    })
        .then(() => {
            fetchDoctors();
        })
        .catch(error => console.error('Error deleting doctor:', error));
}

// Функція для редагування лікаря
function fetchUpdateDoctor(doctorId, updatedDoctor) {
    fetch(`http://127.0.0.1:8000/doctors/${doctorId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedDoctor)
    })
        .then(() => {
            fetchDoctors();
        })
        .catch(error => console.error('Error updating doctor:', error));
}

// Функція для показу лікарів на сторінці
const addDoctorsToPage = (array) => {
    const itemsWrapper = document.getElementById('ItemsWrapper');
    const template = document.getElementById('item-template');

    itemsWrapper.innerHTML = ''; // Очищаємо контейнер

    array.forEach(doctor => {
        const clone = template.content.cloneNode(true);

        clone.querySelector('#avatar').style.backgroundImage = `url(${doctor.picture})`;
        clone.querySelector('#name').textContent = doctor.name;
        clone.querySelector('#specialization').textContent = doctor.description;
        clone.querySelector('#last-update').textContent = `Updated: ${doctor.updated_at}`;
        clone.querySelector('#price').textContent = `${doctor.price}$`;

        // Кнопка редагування
        clone.querySelector('.manage button:first-child').addEventListener('click', () => {
            editDoctor(doctor);
        });

        // Кнопка видалення
        clone.querySelector('.manage button:last-child').addEventListener('click', () => {
            fetchDeleteDoctor(doctor.doctor_id);
        });

        itemsWrapper.appendChild(clone);
    });
}

function fetchCalculateTotalPrice() {
    const doctorIds = selected_doctors.map(doctor => doctor.doctor_id); // Збираємо ID лікарів
    const url = `http://127.0.0.1:8000/doctors/sum_total?doctor_ids=${doctorIds.join('&doctor_ids=')}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('total_price').textContent = `${data.total_price} $`; // Показуємо загальну вартість
        })
        .catch(error => console.error('Error calculating total price:', error));
}

// Функція для відкриття попапу для редагування лікаря
function editDoctor(doctor) {
    document.getElementById('doctorName').value = doctor.name;
    document.getElementById('doctorDescription').value = doctor.description;
    document.getElementById('doctorPrice').value = doctor.price;
    document.getElementById('doctorImage').value = doctor.picture;
    edited_doctor_id = doctor.doctor_id;

    openPopup('Edit Doctor');
}

// Відкриття попапу для додавання або редагування
function openPopup(title) {
    document.getElementById('popupTitle').innerText = title;
    document.getElementById('doctorPopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

// Закриття попапу
function closePopup() {
    document.getElementById('doctorPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('doctorForm').reset();
    edited_doctor_id = null;
}

// Обробка події відправки форми для додавання/редагування лікаря
document.getElementById('doctorForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const doctorData = {
        name: document.getElementById('doctorName').value,
        description: document.getElementById('doctorDescription').value,
        price: parseFloat(document.getElementById('doctorPrice').value),
        picture: document.getElementById('doctorImage').value,
        updated_at: new Date().toISOString()
    };

    if (edited_doctor_id) {
        fetchUpdateDoctor(edited_doctor_id, doctorData);
    } else {
        fetchAddDoctor(doctorData);
    }

    closePopup();
});

document.querySelector('.item-count-button').addEventListener('click', function (event) {
    event.preventDefault();
    fetchCalculateTotalPrice();
});

// Закриття попапу при натисканні кнопки "Закрити"
document.getElementById('closePopup').addEventListener('click', closePopup);

// Відкриття попапу для додавання нового лікаря
document.getElementById('openPopup').addEventListener('click', function () {
    openPopup('Add Doctor');
});

// Пошук і сортування лікарів
document.querySelector('.search-menu form').addEventListener('submit', function (event) {
    event.preventDefault();
    selected_search_term = event.target.querySelector('input').value.trim();
    fetchDoctors();
});

// Очищення пошуку
document.querySelector('.clear').addEventListener('click', function () {
    document.querySelector('.search-menu input').value = '';
    selected_search_term = '';
    fetchDoctors();
});

// Сортування лікарів
document.getElementById('sort').addEventListener('change', function (event) {
    selected_order_by = event.target.value;
    fetchDoctors();
});

// Ініціалізація завантаження лікарів при першому завантаженні сторінки
fetchDoctors();
