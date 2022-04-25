import Head from "next/head";
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>10 de abril de 2022</time>
            <strong>
              Prisma: uma das melhores coisas que já aconteceu no ecossistema?
            </strong>
            <p>
              Um breve arquivo sobre a origem da ferramenta que facilitou o
              acesso de databases e ampliou produtividade para o ecossistema
              JavaScript/TypeScript
            </p>
          </a>
          <a href="#">
            <time>10 de abril de 2022</time>
            <strong>
              Prisma: uma das melhores coisas que já aconteceu no ecossistema?
            </strong>
            <p>
              Um breve arquivo sobre a origem da ferramenta que facilitou o
              acesso de databases e ampliou produtividade para o ecossistema
              JavaScript/TypeScript
            </p>
          </a>
          <a href="#">
            <time>10 de abril de 2022</time>
            <strong>
              Prisma: uma das melhores coisas que já aconteceu no ecossistema?
            </strong>
            <p>
              Um breve arquivo sobre a origem da ferramenta que facilitou o
              acesso de databases e ampliou produtividade para o ecossistema
              JavaScript/TypeScript
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
