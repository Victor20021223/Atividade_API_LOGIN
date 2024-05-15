var body = document.querySelector("body");
var singUpButton = document.querySelector("#singUp");
var singInButton = document.querySelector("#singIn");
var registerButton = document.querySelector("#register");
var urlAPI = "http://localhost/"

body.onload = function(){
    body.className = "on-load";
}

singUpButton.addEventListener("click", function(){
    body.className = "sing-up";
});

singInButton.addEventListener("click", function(){
    body.className = "sing-in";
});

registerButton.addEventListener("click", function(event){
    event.preventDefault(); // Impede o envio do formulário padrão

    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    var data = {
        nome: nome,
        email: email,
        senha: senha
    };

    fetch(urlAPI + "/v1/signup", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário');
        }
        return response.json();
    })
    .then(data => {
        console.log('Usuário cadastrado com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao cadastrar usuário:', error);
    });
});
