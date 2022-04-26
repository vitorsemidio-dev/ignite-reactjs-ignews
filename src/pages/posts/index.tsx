import Prismic from "@prismicio/client";
import { GetStaticProps } from "next";
import Head from "next/head";
import { RichText } from "prismic-dom";
import {
  getPrismicClient,
  PrismicPredicates,
  PrismicTypePost,
  PrismicTypes,
} from "../../services/prismic";
import styles from "./styles.module.scss";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Array<Post>;
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts?.map((post) => (
            <a href="#" key={post.slug}>
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}

type PrismicTypePostResponse = {
  title: any;
  content: Array<{
    type: "paragraph";
    text: string;
  }>;
};

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query<PrismicTypePostResponse>(
    [Prismic.Predicates.at(PrismicPredicates.DOCUMENT_TYPE, PrismicTypes.POST)],
    {
      fetch: [PrismicTypePost.TITLE, PrismicTypePost.CONTENT],
      pageSize: 100,
    },
  );

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find(
          (content) => content.type === "paragraph" && content.text.length > 0,
        )?.text ?? "",
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        },
      ),
    };
  });

  return {
    props: {
      posts,
    },
  };
};
