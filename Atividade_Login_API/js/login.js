var body = document.querySelector("body");
var signUpButton = document.querySelector("#singUp");
var signInButton = document.querySelector("#singIn");
var registerButton = document.querySelector("#register");

body.onload = function(){
    body.className = "on-load";
}

signUpButton.addEventListener("click", function(){
    document.body.className = "sing-up";
});

signInButton.addEventListener("click", function(){
    body.className = "sing-in";
});

signInForm.addEventListener("submit", function(event){
    event.preventDefault(); 

    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    if (!email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    var formData = {
        email: email,
        password: senha
    };

    fetch("https://api-umfg-programacao-iv-2024-291d5e9a4ec4.herokuapp.com/v1/signin", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao fazer login. Por favor, verifique suas credenciais e tente novamente.');
        }
        return response.json();
    })
    .then(data => {
        alert('Login bem-sucedido para o usuário: ' + data.email);
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error.message);
        alert('Erro ao fazer login: ' + error.message);
    });
});

registerButton.addEventListener("click", function(event){
    event.preventDefault(); 

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var senhaconfirm = document.getElementById("senhaconfirm").value;

    if (!email || !senha || !senhaconfirm) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Por favor, insira um endereço de e-mail válido.");
        return;
    }

    if (senha.length < 6 || senha.length > 50) {
        alert("A senha deve ter entre 6 e 50 caracteres.");
        return;
    }

    if (senha !== senhaconfirm) {
        alert("As senhas não correspondem.");
        return;
    }

    var formData = {
        name: name,
        email: email,
        password: senha,
        confirmedPassword: senhaconfirm
    };

    fetch("https://api-umfg-programacao-iv-2024-291d5e9a4ec4.herokuapp.com/v1/signup", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Erro ao cadastrar usuário:', error.message);
        alert('Erro ao cadastrar usuário: ' + error.message);
    });
});

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
