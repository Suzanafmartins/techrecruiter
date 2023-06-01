document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
  
    // Obtém os valores dos campos
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
  
    // Cria uma linha de dados a ser adicionada ao arquivo
    var data = name + ',' + email + '\n';
  
    // Grava os dados no arquivo de texto
    var fs = require('fs');
    fs.appendFile('database.txt', data, function(err) {
      if (err) throw err;
      console.log('Dados salvos com sucesso!');
    });
  });
  
