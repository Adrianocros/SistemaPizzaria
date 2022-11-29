# Projeto Pizzaria :pizza:

### Será desenvolvido em três etapas 🚀

- Desenvolvedores FrontEnd 🖥️
- Desenvolvedores BackEnd 🖥️
- Desenvolvedores Mobile 📴

### Desenvolvimento do sistema

- Desenvolvimento HTML e CSS
- Desenvolvimento JavaScript
- Desenvolvimento Web com ReactJs e Next JS
- Desenvolvimento Backend com NodeJS + Banco de dados
- Desenvolvimento Mobile com React Native

:star:  Inicia o projeto - yarn dev

###	:cactus:	 Desenvolvimento

- TypeScript

- PostgreSQL

- Prisma

- NodeJs

- NextJs

- Axios

  nookies 

  jwt-decode
  
  react-toastify



:heavy_check_mark: TypeScript - yarn add typescript -D
:heavy_check_mark: Express - yarn add express
:heavy_check_mark: Auto complete EXPRESS - yarn add @types/express -D
:heavy_check_mark: Inicializando o TS config -  yarn tsc --init
:heavy_check_mark: Biblioteca para inicilizar - yarn add ts-node-dev -D
:heavy_check_mark: Biblioteca para tratar erros - yarn add express-async-errors
:heavy_check_mark: Biblioteca para qualquer IP possa fazer requisição na API - yarn add cors
:heavy_check_mark: Biblioteca para tipagens do CORS - yarn add @types/cors -D
:heavy_check_mark: PRISMA - yarn add prisma
:heavy_check_mark: PRISMA - yarn add @prisma/client
:heavy_check_mark: Iniciando o PRISMA npx prisma init
:heavy_check_mark: Carrega automaticamente as variáveis de ambiente yarn add dotenv 

:heavy_check_mark: Biblioteca para trabalhar com imagem - yarn add multer

:heavy_check_mark: Tupagem multer - yarn add @types/multer -D

:chains: Conexao com banco
DATABASE_URL="postgresql://postgres:123@localhost:5432/pizzaria?schema=public"

## Banco de dados

##:elephant:Postgres 

:heavy_check_mark: Criar uma migration yarn prisma migrate dev
:heavy_check_mark: Biblioteca para criptografar a senha no banco de daddos yarn add bcryptjs
:heavy_check_mark: Types para a biblioteca bcryptjs yarn add @types/bcryptjs -D

## :bookmark_tabs: Tabelas do Banco de Dados com Relacionamentos
model User{
  id String @id @default(uuid())
  name String
  email String
  password String
  create_at DateTime? @default(now())
  update_at DateTime? @default(now())

  @@map("users")
  }

  model Category{
    id String @id @default(uuid())
    name String
    create_at DateTime? @default(now())
    update_at DateTime? @default(now())

    @@map("categories")
    products Product[]
  }

  model Product{
    id String @id @default(uuid())
    name String
    price String
    description String
    banner String


    create_at DateTime? @default(now())
    update_at DateTime? @default(now())
    
    category Category @relation(fields: [category_id], references: [id])
    
    @@map("products")
    category_id String
    items Item[]
  }

  model Order{
    id String @id @default(uuid())
    table Int
    status Boolean @default(false)
    draft Boolean @default(true)
    name String?
    create_at DateTime? @default(now())
    update_at DateTime? @default(now())

    @@map("orders")
    Items Item[]
  }

  model Item{
    id String @id @default(uuid())
    amount Int

    create_at DateTime? @default(now())
    update_at DateTime? @default(now())
    
    order Order @relation(fields: [order_id], references: [id])
    product Product @relation(fields: [product_id], references: [id])
    
    @@map("items")
    order_id String
    product_id String
  }

## :key: Token TWD

:heavy_check_mark: Secret JWT https://www.md5hashgenerator.com/

:heavy_check_mark:JWT_SECRET=4fdffd0ae342925e166310f62f5bc9cb

:heavy_check_mark: Adicionando as dependencia do Token JWT yarn add jsonwebtoken
:heavy_check_mark: Adicionando as Types do TWD -  yarn add @types/jsonwebtoken -D
