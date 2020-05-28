# Trabalho3_IA
Arquivos de interesse: app.js   ,    /public/map.js     , /public/map.txt
Os codigos começam na linha 29 do arquivo app.js
Para rodar o trabalho abra o terminal na pasta do projeto e digite "nodemon app.js", pronto
qualquer alteração que fizer no código ele vai automaticamente fechar e abrir denovo o seu projeto
então voce n precisa ficar fechando e digitando "node app.js" no terminal sempre que fizer alguma alteração no código.
Referente ao Projeto:
    Mexa somente no arquivo app.js para implementar, implemente na região descrita por um comentário.
    Se precisar crie novos arquivos.

    Criei uma classe Map que se encontra no arquivo public/map.js, ela armazena tanto o mapa na forma de uma matriz quanto as posições de origem e de destino.
    Esta classe esta melhor descrita no arquivo app.js

Sobre Javascript:

    para declarar variaveis vc declara como:
        var nomeDaVariavel;     // Variavel global, pode ser acessada em qualquer lugar do codigo
        let nomeDaVariavel;     // Variavel de escopo, só pode ser acessada no escopo(entre chaves {})
        const nomeDaVariavel;   // Constante igual qualquer linguagem

    variaveis podem ser vetores:
        var vetor = ["posicao1", "posicao2"];
    variaveis podem ser objetos:
        var obj = {
            nome: "leonardo",
            sobrenome: "altemari"
        }

    para printar algo no terminal utilize "console.log("o que vc quiser printar");"
    tudo que voce printar ira aparecer no terminal em que vc rodou o "nodemon app.js"
