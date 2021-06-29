function disableField() {
    const invalidForm = document.querySelector('form:invalid');
    const submitBtn = document.getElementById('submit');
    if (!invalidForm) {
        submitBtn.disabled = false;
    } else {
        return invalidForm;
    }
}
const inputs = document.getElementsByTagName("input");
for (let input of inputs) {
    input.addEventListener('change', disableField);
}
////
const emailInput = document.querySelector('#email')
const error = document.querySelector('.error')
const passInput = document.querySelector('#password')
const passError = document.querySelector('.passError')

emailInput.onblur = function () {
    if (!emailInput.value.includes('@')) {
        emailInput.classList.add('emailError');
        error.innerHTML = 'Please enter correct email';
        emailInput.focus();
    }else{
        emailInput.classList.remove('emailError');
        error.innerHTML = '';
    }
}
passInput.onblur = function () {
    if (passInput.value.length < 8) {
        passError.classList.add('error');
        passError.innerHTML = 'password must contain min 8 symbols';
        passInput.focus();
    }else if (passInput.value.length > 20){
        passError.classList.add('error');
        passError.innerHTML = 'password must contain max 20 symbols';
        passInput.focus();
    }else{
        passInput.classList.remove('error');
        passError.innerHTML = '';
    }

}
