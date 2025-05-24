console.log("Hello, TypeScript!");

const textInput = document.getElementById('textInput') as HTMLInputElement;
const submitButton = document.getElementById('submitButton') as HTMLButtonElement;

submitButton.addEventListener('click', () => {
    alert(textInput.value);
}); 