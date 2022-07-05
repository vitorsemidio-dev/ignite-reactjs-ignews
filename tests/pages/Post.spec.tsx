import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { getSession } from "next-auth/react";
import Post, { getServerSideProps } from "../../src/pages/posts/[slug]";
import { getPrismicClient } from "../../src/services/prismic";

jest.mock("next-auth/react");
jest.mock("../../src/services/stripe");
jest.mock("../../src/services/prismic");

const post = {
  slug: "my-new-post",
  title: "My new post",
  content: "<p>Post excerpt</p>",
  updatedAt: "01-01-2022",
};

describe("Post page", () => {
  it("renders correctly", () => {
    render(<Post post={post} />);

    expect(screen.getByText("My new post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
  });

  it("redirects user if no subscription is found", async () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({
      userActiveSubscription: null,
    } as any);

    const slug = "my-new-post";

    const response = await getServerSideProps({
      req: {
        cookies: {},
      },
      params: {
        slug: slug,
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: `/posts/preview/${slug}`,
          permanent: false,
        }),
      }),
    );
  });

  it("loads initial data", async () => {
    const getSessionMocked = mocked(getSession);
    const getPrismicClientMocked = mocked(getPrismicClient);

    getSessionMocked.mockResolvedValueOnce({
      userActiveSubscription: "fake-active-subscription",
    } as any);
    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: "heading", text: "My new post" }],
          content: [{ type: "paragraph", text: "Post content" }],
        },
        last_publication_date: "01-01-2022",
      }),
    } as any);

    const slug = "my-new-post";

    const response = await getServerSideProps({
      req: {
        cookies: {},
      },
      params: {
        slug: slug,
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: slug,
            title: "My new post",
            content: "<p>Post content</p>",
            updatedAt: "01 de janeiro de 2022",
          },
        },
      }),
    );
  });

  it("rendirects if user has no auth", async () => {
    const getSessionMocked = mocked(getSession);
    getSessionMocked.mockResolvedValueOnce(null as any);

    const slug = "my-new-post";

    const response = await getServerSideProps({
      req: {
        cookies: {},
      },
      params: {
        slug: slug,
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination: "/",
          permanent: false,
        },
      }),
    );
  });
});
