const firebaseConfig = {
  // Coloque aqui as configurações do Firebase
  apiKey: "AIzaSyDBwGMLzdng5JYgfzaSWZ56jnO64nNjrgg",
  authDomain: "techrecruiter-866d5.firebaseapp.com",
  projectId: "techrecruiter-866d5",
  storageBucket: "techrecruiter-866d5.appspot.com",
  messagingSenderId: "1027425469353",
  appId: "1:1027425469353:web:c09e7854be1a761d2c7ab8"
};

// Inicializa o app do Firebase
firebase.initializeApp(firebaseConfig);

// Obtém a referência do banco de dados do Firebase
const database = firebase.database();

// Função para validar o formato do email usando uma expressão regular
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Função para validar a senha, verificando se tem entre 6 e 10 caracteres e contém pelo menos uma letra e um número
function isValidPassword(password) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/;
  return passwordRegex.test(password);
}

// Função para manipular o envio do formulário
function handleFormSubmit(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Obtenha os valores dos campos do formulário
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const sexo = document.getElementById('sexo').value;
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmar-senha').value;

  // Verifique se as senhas coincidem
  if (senha !== confirmarSenha) {
    alert('As senhas não coincidem');
    return;
  }

  // Verifique se a senha está no padrão
  if (!isValidPassword(senha)) {
    alert('A senha deve ter entre 6 e 10 caracteres e conter pelo menos uma letra e um número.');
    return;
  }

  // Crie um objeto com os dados do usuário
  const usuario = {
    nome,
    email,
    sexo,
    senha
  };

  // Crie uma referência para a coleção de usuários
  const usuariosRef = database.ref('usuarios');

  // Adicione o novo usuário ao banco de dados
  usuariosRef.push(usuario)
    .then(() => {
      // Cadastro concluído com sucesso
      alert('Usuário cadastrado com sucesso');

      // Autentique o usuário recém-cadastrado
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, senha)
        .then((userCredential) => {
          // Sucesso ao autenticar o usuário
          const user = userCredential.user;
          console.log("Usuário autenticado:", user);
          window.location.href = "login.html";
        })
        .catch((error) => {
          // Erro ao autenticar o usuário
          console.error("Erro ao autenticar o usuário:", error);
          // Exiba uma mensagem de erro para o usuário, se necessário
        });
    })
    .catch((error) => {
      console.error(error);
      alert('Erro ao cadastrar usuário');
    });
}

// Adicione um evento de escuta para o envio do formulário
const form = document.getElementById('cadastro-form');
form.addEventListener('submit', handleFormSubmit);
