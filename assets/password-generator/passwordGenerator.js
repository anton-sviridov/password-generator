const passwordBlock = document.getElementById("password-generator__block");
const generatedPassword = document.getElementById("generated-password");

const passwordInput = document.getElementById("input-length");
const passwordLength = document.getElementById("password-length");

const checkbox = document.querySelector("input[type='checkbox'][name='charset']");
const regenerateButton = document.getElementById("regenerate__button");


let passwordBuffer = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

function generatePassword(length, buffer) {
    let newPassword = "";
    if (buffer.length == 0) 
    {
        generatedPassword.innerHTML = "Select options to generate a password";
    }
    else {
        for (let i = 0; i < length; i++) 
        {
            newPassword += buffer.charAt(Math.floor(Math.random() * buffer.length));
            generatedPassword.innerHTML = newPassword;
        }
        return(newPassword);
    }    
}

passwordBlock.addEventListener("click", () => {
    var copyText = document.getElementById("generated-password");
    navigator.clipboard.writeText(copyText.innerHTML);
    alert("Password copied to clipboard");
});


passwordInput.addEventListener("input", (event) => {
    passwordLength.textContent = event.target.value;
    generatePassword(passwordLength.textContent, passwordBuffer);
});


document.addEventListener('DOMContentLoaded', () => {
    var checkboxes = document.querySelectorAll('input[type=checkbox][name=charset]');
    for (var checkbox of checkboxes)
    {
        checkbox.addEventListener('change', function(event)
        {
            if (event.target.checked) {
                passwordBuffer += event.target.value;
                generatePassword(passwordLength.textContent, passwordBuffer);
            }
            else {
                passwordBuffer = passwordBuffer.replace(event.target.value, "");
                generatePassword(passwordLength.textContent, passwordBuffer);
            }
        });
    }
}, false);

regenerateButton.addEventListener("click", () => 
{
    generatePassword(passwordLength.textContent, passwordBuffer);
});


