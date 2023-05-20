# Demo Aula

Demo criada na aula teórico prática sobre Base de Dados em aplicações web.


## Iniciar projeto

Antes de usar o projeto deve:
* Ter uma instância MongoDB a correr localmente. Em alternativa pode editar a string de conexão à base de dados por uma do MongoAtlas;
* Ter o runtime NodeJS instalado no seu computador;
* Executar o comando `npm install` para instalar todas as depências do projeto localmente após o comando `git clone` deste projeto;

## Funcionamento do projeto

A aplicação aqui demonstrada executa as operações CRUD básicas de uma aplicação web que gere `items`.

Os `items` são compostos por 3 campos:
```
{
    _id: String,
    name: String,
    quantity: Number
}
```

O campo `_id` é gerado automáticamene a cada save na base de dados.

## Iniciar o projeto

Para correr a aplicação é necessário executar o comando:
* `npm start`

## Observações

O projeto foi criado sem recursos a formatação `CSS` e não tem o objetivo de ser uma demonstração completa de como uma aplicação deve ser construída e estilizada.

Desta forma o projeto aqui representado é o produto minímo viável para integrar o acesso a uma base de dados numa aplicação Web usando o padrão de software MVC.
