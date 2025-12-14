# app-express: API RESTful Simples com Express e TypeScript

Este projeto é uma **API RESTful** simples desenvolvida com **Node.js**, **Express** e **TypeScript**. Ele implementa operações **CRUD** (Create, Read, Update, Delete) para o gerenciamento de uma lista de "itens", utilizando **SQLite** como banco de dados.

## Tecnologias Utilizadas

O projeto utiliza as seguintes tecnologias e bibliotecas:

| Tecnologia | Descrição |
| :--- | :--- |
| **Node.js** | Ambiente de execução JavaScript. |
| **Express** | Framework web rápido e minimalista para Node.js. |
| **TypeScript** | Superset do JavaScript que adiciona tipagem estática. |
| **SQLite3** | Banco de dados leve e sem servidor. |
| **ts-node** | Executa arquivos TypeScript diretamente no Node.js. |
| **nodemon** | Monitora alterações e reinicia o servidor automaticamente em desenvolvimento. |
| **CORS** | Middleware para habilitar o Cross-Origin Resource Sharing. |

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

*   **Node.js** (versão 14 ou superior)
*   **Yarn** ou **npm** (gerenciador de pacotes)

## Instalação

Siga os passos abaixo para configurar e rodar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/daividalves/app-express.git
    cd app-express
    ```
    

2.  **Instale as dependências:**
    Utilizando `yarn`:
    ```bash
    yarn install
    ```
    Ou utilizando `npm`:
    ```bash
    npm install
    ```

## Execução

O projeto pode ser executado em dois modos: desenvolvimento e produção.

### Modo Desenvolvimento

Use o script `dev` para iniciar o servidor com `nodemon` e `ts-node`. Isso permite o *hot-reload*, reiniciando o servidor automaticamente a cada alteração nos arquivos `.ts`.

```bash
yarn dev
# ou
npm run dev
```

O servidor estará acessível em `http://localhost:4000`.

### Modo Produção

Para rodar a aplicação em um ambiente de produção, primeiro compile o código TypeScript para JavaScript e depois inicie o servidor.

1.  **Compilar o código:**
    ```bash
    yarn build
    # ou
    npm run build
    ```
    Os arquivos compilados serão gerados no diretório `dist/`.

2.  **Iniciar o servidor:**
    ```bash
    yarn start
    # ou
    npm start
    ```

## Estrutura do Projeto

A estrutura de diretórios do projeto é organizada da seguinte forma:

```
.
├── db.sqlite             # Arquivo do banco de dados SQLite
├── package.json          # Metadados e dependências do projeto
├── tsconfig.json         # Configurações do TypeScript
├── yarn.lock             # Bloqueio de dependências do Yarn
└── src/
    ├── index.ts          # Ponto de entrada da aplicação (configuração do Express)
    ├── models/
    │   └── item.ts       # Definição do tipo Item (interface/type)
    ├── repositories/
    │   ├── database.ts   # Configuração e conexão com o SQLite, criação da tabela
    │   └── itens-repository.ts # Funções CRUD para a tabela 'itens'
    └── routers/
        └── itens-router.ts # Definição das rotas da API para 'itens'
```

## Endpoints da API

A API expõe os seguintes endpoints para gerenciamento de itens, todos prefixados por `/api`:

| Método | Endpoint | Descrição | Corpo da Requisição (Exemplo) | Resposta de Sucesso |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/itens` | Cria um novo item. | `{ "nome": "Item A", "descricao": "Descrição do Item A" }` | `201 Created` com o item criado e seu `id`. |
| `GET` | `/api/itens` | Lista todos os itens. | N/A | `200 OK` com um array de itens. |
| `GET` | `/api/itens/:id` | Busca um item pelo `id`. | N/A | `200 OK` com o item encontrado ou `404 Not Found`. |
| `PUT` | `/api/itens/:id` | Atualiza um item pelo `id`. | `{ "nome": "Novo Nome", "descricao": "Nova Descrição" }` | `204 No Content` ou `404 Not Found`. |
| `DELETE` | `/api/itens/:id` | Deleta um item pelo `id`. | N/A | `204 No Content` ou `404 Not Found`. |

### Modelo de Dados (`Item`)

O modelo de dados para um item é o seguinte:

```typescript
type Item = {
    id?: number // Opcional, gerado pelo banco de dados
    nome: string
    descricao: string
}
```
