# web_labs
web_labs

Callback — це функція, яка передається як аргумент в іншу функцію і викликається після завершення певної операції. Це дозволяє обробляти асинхронний код. Наприклад, функція викликається після того, як виконана операція, така як отримання даних із сервера.

function greet(name, callback) {
    console.log(`Hello, ${name}`);
    callback();
}

function sayGoodbye() {
    console.log('Goodbye!');
}

greet('John', sayGoodbye);  // Після привітання викликається функція прощання

------------------------------------------------------------------------------------------------

Стани об'єкта Promise
Promise має три стани:

Pending (Очікування): Операція ще не завершена.
Fulfilled (Завершений успішно): Операція завершилася успішно.
Rejected (Відхилений): Операція завершилася невдачею.

------------------------------------------------------------------------------------------------

Promise: then(), catch(), finally()
then(): Викликається, коли Promise успішно завершився.
catch(): Викликається, коли Promise завершився помилкою.
finally(): Викликається незалежно від того, чи успішно завершився Promise чи з помилкою.

const myPromise = new Promise((resolve, reject) => {
    let success = true;
    if (success) {
        resolve("Operation was successful");
    } else {
        reject("Operation failed");
    }
});

myPromise
    .then(result => console.log(result))  // Викликається при успішному завершенні
    .catch(error => console.error(error)) // Викликається при помилці
    .finally(() => console.log('Operation complete')); // Викликається завжди

------------------------------------------------------------------------------------------------

async/await — це більш зручний спосіб роботи з асинхронними функціями, 
що дозволяє писати асинхронний код так, ніби він є синхронним.


async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchData();  // Виконує асинхронний запит і чекає на результат

------------------------------------------------------------------------------------------------

Як зробити HTTP-запит?
HTTP-запит у JavaScript можна зробити за допомогою функції fetch(). Вона повертає об'єкт Promise, що дозволяє обробляти відповідь запиту асинхронно.

fetch('https://api.example.com/data')
    .then(response => response.json()) // Парсинг відповіді у форматі JSON
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

------------------------------------------------------------------------------------------------

Стрілочна функція — це коротший спосіб написання функцій у JavaScript. 
Вона має більш зручний синтаксис і не має власного значення this.

const add = (a, b) => a + b;
console.log(add(2, 3)); // 5

------------------------------------------------------------------------------------------------

Template strings (шаблонні рядки) — це спосіб форматування рядків у JavaScript. Вони використовують зворотні лапки (``) і дозволяють вставляти змінні прямо всередині рядка за допомогою ${}.

const name = 'John';
const greeting = `Hello, ${name}!`;
console.log(greeting); // Hello, John!

------------------------------------------------------------------------------------------------

Що таке деструктуризація?
Деструктуризація дозволяє витягувати значення з масивів або об'єктів і присвоювати їх змінним.

const user = { name: 'John', age: 30 };
const { name, age } = user;
console.log(name); // John
console.log(age);  // 30

------------------------------------------------------------------------------------------------

Що таке оператори rest та spread?

Rest оператор (...) збирає залишкові елементи в масив або об'єкт. Його використовують для збирання аргументів функції або частини масиву/об'єкта.

function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 6

Spread оператор (...) розкладає елементи масиву або властивості об'єкта. 
Його використовують для копіювання або комбінування масивів/об'єктів.

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

const user = { name: 'John', age: 30 };
const updatedUser = { ...user, age: 31 };
console.log(updatedUser); // { name: 'John', age: 31 }

------------------------------------------------------------------------------------------------

Bonuses quetions

Set і Map

Set — це колекція унікальних значень. Не дозволяє дублювати елементи.

const mySet = new Set([1, 2, 3, 3]);
console.log(mySet); // Set { 1, 2, 3 }
mySet.add(4);
console.log(mySet); // Set { 1, 2, 3, 4 }


Map — це колекція ключ-значення, де ключами можуть бути будь-які типи даних.

const myMap = new Map();
myMap.set('name', 'John');
myMap.set('age', 30);
console.log(myMap.get('name')); // John

------------------------------------------------------------------------------------------------

WeakSet і WeakMap

WeakSet — це колекція, яка зберігає тільки об'єкти і дозволяє автоматично 
видаляти елементи при відсутності інших посилань на них (що важливо для управління пам'яттю).

let obj1 = { name: 'John' };
let obj2 = { name: 'Doe' };
const weakSet = new WeakSet([obj1, obj2]);
console.log(weakSet.has(obj1)); // true


WeakMap — це колекція ключ-значення, де ключами можуть бути тільки об'єкти. 
Подібно до WeakSet, дозволяє збирати елементи, які більше не використовуються.

let key = {};
let weakMap = new WeakMap();
weakMap.set(key, 'value');
console.log(weakMap.get(key)); // 'value'

------------------------------------------------------------------------------------------------

Promise.all(), Promise.any(), Promise.race()

Promise.all() — приймає масив обіцянок і виконується, коли всі обіцянки завершені. Якщо хоча б одна обіцянка буде відхилена, весь Promise.all відхиляється.

const promise1 = Promise.resolve(3);
const promise2 = Promise.resolve(42);
Promise.all([promise1, promise2]).then(values => {
    console.log(values); // [3, 42]
});

-
Promise.any() — виконується, коли хоча б одна з обіцянок завершена. 
Якщо всі обіцянки відхиляються, Promise.any також відхиляється.

const promise1 = Promise.reject('Error');
const promise2 = Promise.resolve(42);
Promise.any([promise1, promise2]).then(value => {
    console.log(value); // 42
});

-
Promise.race() — виконується, коли перша з обіцянок завершується (успішно або з помилкою).

const promise1 = new Promise((resolve) => setTimeout(resolve, 500, 'One'));
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'Two'));

Promise.race([promise1, promise2]).then(value => {
    console.log(value); // 'Two', бо друга обіцянка завершилась швидше
});