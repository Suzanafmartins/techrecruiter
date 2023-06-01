// Função chamada quando o email é alterado
function onChangeEmail() {
    const emailInput = document.getElementById("email");
    const emailRequiredError = document.getElementById("email-required-error");
    const emailInvalidError = document.getElementById("email-invalid-error");
    
    // Verifica se o campo de email está vazio
    if (emailInput.value.trim() === "") {
        emailRequiredError.style.display = "block";
        document.getElementById("login-button").disabled = true;
    } else if (!validateEmail(emailInput.value.trim())) {
        emailInvalidError.style.display = "block";
        document.getElementById("login-button").disabled = true;
    } else {
        emailRequiredError.style.display = "none";
        emailInvalidError.style.display = "none";
        document.getElementById("login-button").disabled = false;
    }
}

// Função chamada quando a senha é alterada
function onChangePassword() {
    const passwordInput = document.getElementById("password");
    const passwordRequiredError = document.getElementById("password-required-error");
    
    // Verifica se o campo de senha está vazio
    if (passwordInput.value.trim() === "") {
        passwordRequiredError.style.display = "block";
        document.getElementById("login-button").disabled = true;
    } else {
        passwordRequiredError.style.display = "none";
        document.getElementById("login-button").disabled = false;
    }
}

// Função chamada quando o botão de login é clicado
function login() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Aqui você pode adicionar a lógica para autenticar o usuário
    // Usando o Firebase Authentication ou outro serviço de autenticação
    // Exemplo com o Firebase Authentication:
    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Sucesso ao fazer login
        const user = userCredential.user;
        console.log("Usuário logado:", user);
        // Redirecionar para a página desejada
        window.location.href = "home.html";
    })
    .catch((error) => {
        // Erro ao fazer login
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Erro ao fazer login:", errorCode, errorMessage);
        if (errorCode === "auth/user-not-found") {
          alert("Usuário não encontrado. Verifique suas credenciais.");
        } else {
          // Exibir mensagem de erro para o usuário, se necessário
        }
    });
}
