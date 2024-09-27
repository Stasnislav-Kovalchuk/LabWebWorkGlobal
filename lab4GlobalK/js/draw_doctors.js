import { doctors } from './data.js';

let selected_doctors = [...doctors];

const addDoctorsToPage = (array) => {
    const itemsWrapper = document.getElementById('ItemsWrapper');
    const template = document.getElementById('item-template');

    // Очищення попередніх елементів
    let child = itemsWrapper.firstChild;
    while (child) {
        const nextSibling = child.nextSibling;
        if (child.nodeType === 1 && child.tagName.toLowerCase() === 'div') {
            itemsWrapper.removeChild(child);
        }
        child = nextSibling;
    }

    // Додавання нових елементів
    array.forEach(doctor => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('#avatar').style.backgroundImage = `url(${doctor.img})`;
        clone.querySelector('#name').innerText = doctor.name;
        clone.querySelector('#specialization').innerText = doctor.description;
        clone.querySelector('#last-update').innerText = doctor.last_updated;
        clone.querySelector('#price').innerText = `${doctor.price}$`;
        itemsWrapper.appendChild(clone);
    });
};
// Ця функція відфільтровує лікарів за введеним користувачем пошуковим запитом:
function filterDoctors(searchTerm) {
    return doctors.filter(doctor =>
        doctor.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
        doctor.description.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
    );
}

// Ця функція обчислює загальну вартість послуг від обраних лікарів
function calculateTotalPrice() {
    const totalPrice = selected_doctors.reduce((sum, doctor) => sum + doctor.price, 0);
    document.getElementById('total_price').textContent = `${totalPrice.toString()} $`;
}

// Ця функція сортує лікарів на основі обраної категорії
function sortByCategory(sortBy) {
    if (sortBy === 'price') { 
        return selected_doctors.slice().sort((a, b) => a.price - b.price);
    } else if (sortBy === 'name') { 
        return selected_doctors.slice().sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
    }
    return selected_doctors;
}

// Event listeners

// Пошук і сортування лікарів
document.querySelector('.search-menu').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = event.target.querySelector('input').value;
    
    if (searchTerm !== '') {
        selected_doctors = filterDoctors(searchTerm);
    } else {
        selected_doctors = doctors;
    }

    const selected_value = document.getElementById('sort').value;
    addDoctorsToPage(sortByCategory(selected_value !== 'Choose one...' ? selected_value : 'name'));
});

document.getElementById('sort').addEventListener('change', function(event) {
    const sortBy = event.target.value;
    addDoctorsToPage(sortByCategory(sortBy));
});


document.getElementById('sort').addEventListener('change', function(event) {
    const sortBy = event.target.value;
    addDoctorsToPage(sortByCategory(sortBy));
});

document.querySelector('.item-count-button').addEventListener('click', function(event) {
    event.preventDefault();
    calculateTotalPrice();
});

// Initial load
addDoctorsToPage(selected_doctors);


// Open and close popup functionality
const openPopup = document.getElementById('openPopup');
const closePopup = document.getElementById('closePopup');
const popup = document.getElementById('popup');

openPopup.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default action of anchor tag
    popup.style.display = 'block'; // Show popup
});

closePopup.addEventListener('click', function () {
    popup.style.display = 'none'; // Hide popup
});

// Close popup when clicking outside of it
window.addEventListener('click', function (event) {
    if (event.target == popup) {
        popup.style.display = 'none';
    }
});

// Form submission (for demonstration purposes)
document.getElementById('doctorForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('doctorName').value;
    const description = document.getElementById('doctorDescription').value;
    const price = document.getElementById('doctorPrice').value;
    
    // Do something with the form data (e.g., send it to the server)
    alert(`Doctor Created!\nName: ${name}\nDescription: ${description}\nPrice: ${price}`);
    
    // Close the popup after submission
    popup.style.display = 'none';
    
    // Reset form
    this.reset();
});
