<img src=".github/home-ig-news.png" />

<h1 align="center">
   ig.news - ReactJS | <img alt="badge rocketseat" align="center" src=".github\rocket.svg">
</h1>

<p align="center">
<img src="https://img.shields.io/static/v1?logo=Fauna&logoColor=3A1AB6&label=Fauna&message=FaunaDB&color=3A1AB6" alt="Logo Fauna cor correta com hex #3A1AB6" />
<img src="https://img.shields.io/static/v1?logo=Figma&logoColor=F24E1E&label=Figma&message=Figma&color=F24E1E" alt="Logo Figma cor correta com hex #F24E1E" />
<img src="https://img.shields.io/static/v1?logo=Jest&logoColor=C21325&label=Jest&message=Jest&color=C21325" alt="Logo Jest cor correta com hex #C21325" />
<img src="https://img.shields.io/static/v1?logo=Next.js&logoColor=000000&label=Next.js&message=Next.js&color=000000" alt="Logo Next.js cor correta com hex #000000"  />
<img src="https://img.shields.io/static/v1?logo=Prismic&logoColor=5163BA&label=Prismic&message=Prismic&color=5163BA" alt="Logo Prismic cor correta com hex #5163BA"  />
<img src="https://img.shields.io/static/v1?logo=Sass&logoColor=CC6699&label=Sass&message=Sass&color=CC6699" alt="Logo Sass cor correta com hex #CC6699"  />
<img src="https://img.shields.io/static/v1?logo=Stripe&logoColor=008CDD&label=Stripe&message=Stripe&color=008CDD" alt="Logo Stripe cor correta com hex #008CDD"  />
<img src="https://img.shields.io/static/v1?logo=TypeScript&logoColor=3178C6&label=TypeScript&message=TypeScript&color=3178C6" alt="Logo TypeScript cor correta com hex #3178C6"  />
</p>

---

**ig.news** é um projeto cujo objetivo é permitir aos usuários acessarem conteúdos do blog através de uma inscrição.

<p align="center">
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-rodar-o-projeto">Como rodar o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-extensões-vscode">Extensões VsCode</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Licença</a>
</p>

## 💻 Projeto

Para o desenvolvimento do projeto foi utilizando [JAMStack](https://jamstack.org/) (JavaScript, API e Markup)

O framework selecionado foi [NextJS](https://nextjs.org/) aplicando conceitos como consumo de API externas, API Root, Server Side Rendering (SSR), Static Side Generation (SSG). Foi utilizado o [Stripe](https://stripe.com/br) como Gateway de Pagamento. Para autenticação, foi optado [NextAuth](https://next-auth.js.org/) com login social pelo Github. O Banco de dados escolhido para armazenar os dados foi o [FaunaDB](https://fauna.com/). E por último, mas não menos importante, teve o [Prismic CMS](https://prismic.io/) para adição, armazenamento e gerenciamento do conteúdos dos posts.

<img src=".github/posts-ig-news.png" />

## 🧭 Como rodar o projeto

### 🚨 Requisitos

**Necessário realizar as instalações:**

- [Git](https://git-scm.com/)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)
- [Yarn](https://classic.yarnpkg.com/lang/en/)

**Criar conta e configurar os serviços externos:**

- [FaunaDB](https://fauna.com/)
- [OAuth Apps Github](https://github.com/settings/developers)
- [Prismic](https://prismic.io/)
- [Stripe](https://stripe.com/br)

**Clone este repositório**

```bash
git clone https://github.com/vitorsemidio-dev/ignite-reactjs-ignews.git
```

**Acesse a pasta**

```bash
cd ignite-reactjs-ignews.git
```

### 🔑 Variáveis Ambiente

Criar arquivo `.env.local` e preencher os valores das variáveis de ambiente

```env
# FaunaDB
FAUNADB_API_KEY=
FAUNADB_DOMAIN=

# Github
GITHUB_ID=
GITHUB_SECRET=

# Next
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Prismic CMS
PRISMIC_ACCESS_TOKEN=
PRISMIC_API_URL=

# Stripe
STRIPE_API_KEY=
STRIPE_CANCEL_URL=
STRIPE_SUCCESS_URL=
STRIPE_WEBHOOK_SECRET=

# Stripe Public
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
```

**Instale as dependências**

```bash
yarn
```

**Execute a aplicação**

```bash
yarn dev
```

**Ouvir os webhooks**

```
stripe listen --forward-to localhost:3000/api/webhooks
```

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [FaunaDB](https://fauna.com/)
- [JAMStack](https://jamstack.org/)
- [Jest](https://jestjs.io/pt-BR/)
- [NextJS](https://nextjs.org/)
- [NextAuth](https://next-auth.js)
- [Prismic CMS](https://prismic.io/)
- [Sass](https://sass-lang.com/)
- [Stripe](https://stripe.com/br)


## 🔖 Layout

Você pode visualizar o layout do projeto através [desse link](https://www.figma.com/community/file/1120711251998877938). É necessário ter conta no [Figma](https://figma.com) para acessá-lo.

<img src=".github/ig-news-figma.png" />

## 🧪 Testes

**Utilize o comando a seguir para rodar os testes:**

```bash
yarn test
```

```bash
yarn test:coverage
```

<img src=".github/teste-coverage.png" alt="Cobertura dos testes | Test Coverage"/>

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
