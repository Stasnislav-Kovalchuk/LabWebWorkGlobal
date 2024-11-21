## Лабораторні роботи з дисципліни "Вебтехнології та вебдизайн"


Як використовувати редʼюсери (reducers) у Redux?
const counterReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        case 'SET_COUNT':
            return { count: action.payload };
        default:
            return state;
    }
};


Що таке middleware у Redux?
Middleware — це функції, які виконуються між моментом диспатчу дії та моментом обробки редʼюсером. Вони можуть:

Логувати дії (логери).
Обробляти асинхронні запити (наприклад, за допомогою redux-thunk або redux-saga).
Модифікувати або перевіряти дії.

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));


Призначення redux-thunk
redux-thunk — це middleware, яке дозволяє диспатчити функції, а не об'єкти. Це корисно для асинхронних операцій, таких як запити до API:

Асинхронний action creator:
javascript

const fetchUsers = () => async (dispatch) => {
    const response = await fetch('/users');
    const data = await response.json();
    dispatch({ type: 'SET_USERS', payload: data });
};