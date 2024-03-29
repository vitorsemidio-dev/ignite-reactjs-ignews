import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { useEffect } from "react";

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
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.userActiveSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [post.slug, router, session]);

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

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
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

  const timeToRevalidateInSeconds = 60 * 30; // 30 minutes

  return {
    props: {
      post,
    },
    revalidate: timeToRevalidateInSeconds,
  };
};
