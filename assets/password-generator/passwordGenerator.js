const passwordBlock = document.getElementById("password-generator__block");
const generatedPassword = document.getElementById("generated-password");

const passwordInput = document.getElementById("input-length");
const passwordLength = document.getElementById("password-length");

const checkbox = document.querySelector("input[type='checkbox'][name='charset']");
const regenerateButton = document.getElementById("regenerate__button");


const charset = [
    "abcdefghijklmnopqrstuvwxyz",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "0123456789",
    "!@#$%^&*()"
];

let passwordBuffer = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

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

    // add class copied
    passwordBlock.setAttribute("id", "copied");
    setTimeout(() => {
        passwordBlock.removeAttribute("id", "copied");
    }, 200);
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
                passwordBuffer += charset[event.target.value];
                generatePassword(passwordLength.textContent, passwordBuffer);
            }
            else {
                passwordBuffer = passwordBuffer.replace(charset[event.target.value], "");
                generatePassword(passwordLength.textContent, passwordBuffer);
            }

            console.log(charset[event.target.value]);
        });
    }
}, false);

regenerateButton.addEventListener("click", () => 
{
    generatePassword(passwordLength.textContent, passwordBuffer);
});


