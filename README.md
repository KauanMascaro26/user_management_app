# Gestão de Usuários com Captura e Validação Facial

## Sobre o Projeto

Este projeto consiste em uma aplicação web para gerenciamento de usuários, permitindo realizar operações de cadastro, consulta, edição e exclusão de registros.

Além das funcionalidades básicas de CRUD, foi implementado um diferencial utilizando Inteligência Artificial para validação facial em tempo real. Antes de fazer a captura foto do usuário, o sistema verifica se existe um rosto detectado e se ele está corretamente posicionado em frente à câmera.

O objetivo foi desenvolver uma solução simples, organizada e de fácil execução, seguindo boas práticas de desenvolvimento e proporcionando uma melhor experiência para o usuário.

---

## Funcionalidades

### Cadastro de Usuários

* Cadastro de nome e e-mail.
* Captura obrigatória de foto pela webcam.
* Armazenamento das informações em banco de dados SQLite.

### Listagem de Usuários

* Exibição de todos os usuários cadastrados.
* Visualização da foto capturada.

### Edição de Usuários

* Alteração de nome, e-mail e foto.

### Exclusão de Usuários

* Remoção de registros com confirmação do usuário.

### Validação Facial (Diferencial)

* Detecção facial em tempo real utilizando Face API.
* Identificação de ausência de rosto.
* Validação de distância da câmera.
* Liberação da captura apenas quando o rosto estiver corretamente enquadrado.

---

## Tecnologias Utilizadas

### Frontend

#### HTML5

Utilizado para construção da estrutura da interface.

#### CSS3

Responsável pela estilização da aplicação e organização visual dos componentes.

#### JavaScript

Utilizado para manipulação da interface, comunicação com a API e integração com a webcam.

---

### Backend

#### Node.js

Escolhido por permitir o desenvolvimento de APIs de forma simples e eficiente utilizando JavaScript.

#### Express.js

Framework utilizado para criação das rotas da API REST e gerenciamento das requisições HTTP.

---

### Banco de Dados

#### SQLite3

Foi escolhido por ser um banco de dados leve, não exigir instalação adicional e armazenar todas as informações em um único arquivo, facilitando a execução do projeto em diferentes ambientes.

---

### Inteligência Artificial

#### Face API

Biblioteca utilizada para realizar a detecção facial através da webcam.

#### Tiny Face Detector

Modelo utilizado para identificação rápida do rosto em tempo real, possibilitando a validação de enquadramento antes da captura da foto.

---

## Estrutura do Projeto

```text
user_management_app/

├── backend/
│   ├── controllers/
│   ├── database/
│   │   └── users.db
│   ├── routes/
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   ├── models/
│   └── index.html
│
└── README.md
```

---

## Localização do Banco de Dados

O banco de dados SQLite é criado automaticamente durante a execução do projeto.

Arquivo gerado:

```text
backend/database/users.db
```

Todas as informações cadastradas são armazenadas nesse arquivo.

---

## Como Executar o Projeto

### Pré-requisitos

* Node.js instalado
* Visual Studio Code (recomendado)
* Extensão Live Server

---

### 1. Clonar o Repositório

```bash
git clone <https://github.com/KauanMascaro26/user_management_app.git>
```

---

### 2. Acessar o Projeto

```bash
cd user_management_app
```

---

### 3. Instalar Dependências do Backend

```bash
npm install
```

---

### 4. Iniciar o Servidor

Acesse a pasta do backend:

```bash
cd backend
```

Execute:

```bash
node server.js
```

Servidor disponível em:

```text
http://localhost:3000
```

---

### 5. Executar o Frontend

Abra a pasta frontend no Visual Studio Code.

Em seguida:

* Clique com o botão direito no arquivo index.html
* Selecione "Open with Live Server"

A aplicação será aberta automaticamente no navegador.

---

## Funcionamento da Validação Facial

Ao abrir a câmera, o sistema realiza uma análise contínua utilizando Face API.

Mensagens exibidas:

* Nenhum rosto detectado
* Aproxime-se da câmera
* Afaste-se da câmera
* Rosto bem posicionado

A captura da foto somente é habilitada quando o rosto estiver corretamente enquadrado.

Além disso, o sistema impede o cadastro de usuários sem foto.

---

## Decisões Técnicas

### Utilização do SQLite

Foi escolhido por ser simples de configurar e adequado para aplicações pequenas e testes técnicos, eliminando a necessidade de instalar servidores externos de banco de dados.

### Utilização de JavaScript em Todo o Projeto

A escolha do JavaScript tanto no frontend quanto no backend reduz a complexidade do desenvolvimento e facilita a manutenção do código.

### Implementação da Validação Facial

A validação facial foi desenvolvida como um diferencial para aumentar a qualidade dos dados cadastrados e demonstrar integração com bibliotecas de Inteligência Artificial.

---

## Desafios Enfrentados

### Captura de Imagem pela Webcam

Foi necessário integrar a API nativa de webcam do navegador para realizar a captura e armazenamento da foto do usuário.

### Armazenamento da Imagem

A foto capturada é convertida para Base64 e armazenada juntamente com os demais dados do usuário, permitindo sua exibição posteriormente na aplicação.

---

## Autor

Kauan Mascaro

