"use strict";
console.log("Hello, TypeScript!");
const textInput = document.getElementById('textInput');
const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', () => {
    alert(textInput.value);
});
