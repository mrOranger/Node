const username = document.getElementById('username-field');
const password = document.getElementById('password-field');
const errorContainer = document.getElementById('error-container');

function removeBorderIfExists(element){
    if(element.getAttribute('style') != undefined){
        element.removeAttribute('style');
    }
}

function validate(){
    let checkUsername = true;
    let checkPassword = true;

    removeBorderIfExists(username);
    removeBorderIfExists(password);

    if(username.value == ''){
        username.setAttribute('style', 'border: 2px solid #ff0051;');
        checkUsername = false;
    }
    if(password.value == ''){
        password.setAttribute('style', 'border: 2px solid #ff0051;');
        checkPassword = false;
    }
    return checkPassword && checkUsername;
}

function checkErroMessage(){
    if(document.getElementById('error-message')){
        document.getElementById('error-message').remove();
    }
}

function submit(){
    if(validate()){
        checkErroMessage();
        let query = 'username=' + username.value + '&password=' + password.value;
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 401){
                let errorMessage = document.createElement('div');
                errorMessage.setAttribute('id', 'error-message');
                let message = document.createElement('p');
                errorMessage.classList.add('w3-container');
                errorMessage.classList.add('w3-center');
                errorMessage.classList.add('w3-animate-top');
                message.setAttribute('style', 'color: #ff0051');
                message.innerHTML += 'Not valid credentials';
                errorMessage.appendChild(message);
                errorContainer.append(errorMessage);
            }else if(this.readyState == 4 && (this.status != 200 && this.status != 401)){
                let errorMessage = document.createElement('div');
                errorMessage.setAttribute('id', 'error-message');
                let message = document.createElement('p');
                errorMessage.classList.add('w3-container');
                errorMessage.classList.add('w3-center');
                errorMessage.classList.add('w3-animate-top');
                message.setAttribute('style', 'color: #ff0051');
                message.innerHTML += 'Internal server error';
                errorMessage.appendChild(message);
                errorContainer.append(errorMessage);
            }else if(this.readyState == 4 && this.status == 200){
                window.location = "http://localhost:8080/index";
            }
        }
        xhttp.open('POST', '/', true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(query);
    }
}