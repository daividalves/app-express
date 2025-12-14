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

## Detalhes Técnicos e Decisões de Projeto

Esta seção detalha as decisões técnicas e as melhores práticas adotadas na construção desta API.

### 1. Configuração e Desenvolvimento

*   **Inicialização do Projeto:** O arquivo `package.json` é comumente criado de forma automática com as configurações padrão usando o comando `npm init -y`.
*   **TypeScript:** O uso de TypeScript, em vez de JavaScript puro, foi escolhido para adicionar **tipagem estática** e **intellisense**, o que é crucial para reduzir erros e aumentar a manutenibilidade em projetos de médio a grande porte.
*   **Compilação:** A configuração `outDir` no `tsconfig.json` define o diretório onde os arquivos JavaScript compilados serão salvos.
*   **Interfaces e Transpilação:** As `Interfaces` definidas no TypeScript são um recurso de *design time* e **desaparecem completamente** do código JavaScript final após a transpilação (processo conhecido como *erasure*), pois o JavaScript não possui esse conceito nativo.

### 2. Express e Boas Práticas REST

*   **Função do Express:** O Express atua como um **framework web minimalista** para gerenciar rotas e requisições HTTP de forma eficiente.
*   **Análise de JSON:** Para que a API consiga ler dados enviados no corpo da requisição em formato JSON (acessível via `req.body`), o middleware `app.use(express.json())` é configurado.
*   **Tratamento de Erros:** Um Middleware de tratamento de erros no Express deve ter a assinatura de **quatro argumentos** `(err, req, res, next)` para ser reconhecido e executado apenas quando um erro é propagado.
*   **Códigos de Status HTTP:** Ao criar um novo recurso via API REST, o código de status HTTP mais semanticamente correto para uma resposta de sucesso é o **`201 Created`**.

### 3. Persistência de Dados (SQLite)

*   **Padrão Assíncrono:** O driver padrão `sqlite3` para Node.js opera nativamente usando o padrão de **Callbacks (Erro-Primeiro)**.
*   **Obtenção do ID:** Ao inserir um registro com `db.run()`, o ID do registro recém-criado (auto-incremento) é acessível via `this.lastID` dentro do *callback*.
*   **Cuidado com Arrow Functions:** Funções de seta (**Arrow Functions NÃO devem ser usadas**) como *callback* para `db.run()`, pois elas não preservam o contexto `this` necessário para acessar o `lastID`. Deve-se usar uma função tradicional (`function`) para que o `sqlite3` possa injetar o contexto correto.
