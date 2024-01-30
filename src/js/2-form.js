'use strict';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const textarea = form.querySelector('textarea');

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

function onFormInput() {
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();

    const data = {
        email,
        message,
    };

    saveToLS(STORAGE_KEY, data);
}

function onFormSubmit(evt) {
    evt.preventDefault();

    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();

    if (!email || !message) {
        alert('Please fill in all the fields of the form.');
        return;
    }

    const data = {
        email,
        message,
    };

    console.log(data);

    localStorage.removeItem(STORAGE_KEY);

    form.reset();
}

function saveToLS(key, value) {
    const archive = JSON.stringify(value);
    localStorage.setItem(key, archive);

}

function loadFromLS(key) {
    const archive = localStorage.getItem(key);

    try {
        return JSON.parse(archive);
    } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
        return {};
    }
}

function init() {
    const data = loadFromLS(STORAGE_KEY) || {};

    form.elements.email.value = data.email || '';
    form.elements.message.value = data.message || '';
}

init();