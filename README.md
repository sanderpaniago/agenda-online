# Agenda-Online

![bloggif_600eb38f71c1f](https://user-images.githubusercontent.com/52095222/105729853-0565d600-5f04-11eb-85b6-70da81ba2d71.gif)

## 🔬 Tecnologias

esse projeto foi desenvolvido com:

- ReactJs
- NextJs
- JavaScript
- Tailwindcss


## 💻 Projeto

O projeto tem como objetivo ajudar o cliente a fazer a criação de agendamentos no google agenda do empreededor, apos informar o nome, data, hora e o tipo do servico, o cliente pode efetuar o agendamento. Os serviços vem direto de uma planilha do google sheets tornando essa parte do aplicativo dinamica.

## 📝 Pré-requisitos:

Você precisa do NodeJs e um gerenciador de dependências(NPM ou YARN) em sua maquina.

### instalando as dependências:

```jsx
// instalando as dependencias:
npm install
// ou 
yarn install

// executando o projeto:
npm dev
// ou
yarn dev 
```

### ⚙️ Configurando o google sheet:

- crie uma planilha no seu google Sheet
- acesse e crie uma conta no [consoledo google](console.cloud.google.com) caso não tenha.
- crie um novo projeto
- pesquise por Google Sheets API e adicione no seu projeto.
- vá em credenciais, gerenciar conta de serviço e crie uma nova conta de serviço.
- apos criada clique em ações e selecione criar chave, ele vai gerar um json.
- apos isso no projeto crie um arquivo .env.local e preencha as variaveil de embiente conforme exemplificado no .env.example
- Agora basta pegar o email de serviço gerado e compartilhar na planilha.
- Apos isso é necessario o id de uma agenda do google.

## 📏 Layout do figma
para acessar o layout do projeto [click aqui](https://www.figma.com/file/zpJxwd2SnnOvStIyQlk4NJ/AgendamentoOnline?node-id=0%3A1)

## 👨🏻‍💻 Author:

- **Sander Paniago** - [LinkedIn](https://www.linkedin.com/in/sanderpaniago) - [instagram](https://www.instagram.com/sander_paniago/)

## 🚀 Build

link para a [demo](https://agendaonline.sanderpaniago.vercel.app/)

## 🗝 licenças

Este projeto é licenciado sobre a licença MIT - [LICENSE.md](LICENSE.md) para mais informações.
