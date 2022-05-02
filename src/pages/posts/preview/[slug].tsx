import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { RichText } from "prismic-dom";
import { getPrismicClient, PrismicTypes } from "../../../services/prismic";
import styles from "../post.module.scss";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
  return (
    <>
      <Head>
        <title>{post?.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post?.title}</h1>
          <time>{post?.updatedAt}</time>

          <div
            className={`${styles.postContent} ${styles.postContentPreview}`}
            dangerouslySetInnerHTML={{
              __html: post?.content,
            }}
          />
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

type PrismicTypePostResponse = {
  title: any;
  content: Array<{
    type: "paragraph";
    text: string;
  }>;
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  if (slug === "favicon.png") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const prismic = getPrismicClient();

  const response = await prismic.getByUID<PrismicTypePostResponse>(
    PrismicTypes.POST,
    String(slug),
    {},
  );

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.slice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      },
    ),
  };

  return {
    props: {
      post,
    },
  };
};
