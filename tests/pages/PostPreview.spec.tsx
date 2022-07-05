import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Post, {
  getStaticPaths,
  getStaticProps,
} from "../../src/pages/posts/preview/[slug]";
import { getPrismicClient } from "../../src/services/prismic";

jest.mock("next-auth/react");
jest.mock("next/router");
jest.mock("../../src/services/stripe");
jest.mock("../../src/services/prismic");

const post = {
  slug: "my-new-post",
  title: "My new post",
  content: "<p>Post excerpt</p>",
  updatedAt: "01-01-2022",
};

describe("Post Preview page", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMoked = mocked(useRouter);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });
    useRouterMoked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<Post post={post} />);

    expect(screen.getByText("My new post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("redirects user to full post when user is subscribed", async () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMoked = mocked(useRouter);
    const pushMock = jest.fn();
    useSessionMocked.mockReturnValueOnce({
      data: {
        userActiveSubscription: "fake-active-subscription",
        expires: "fake-expires",
      },
      status: "authenticated",
    });
    useRouterMoked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<Post post={post} />);

    expect(pushMock).toHaveBeenCalledWith("/posts/my-new-post");
  });

  it("loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

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

    const response = await getStaticProps({ params: { slug: "my-new-post" } });

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

  it("redirect if slug is favicon.png", async () => {
    const slug = "favicon.png";

    const response = await getStaticProps({ params: { slug: slug } });

    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination: "/",
          permanent: false,
        },
      }),
    );
  });

  it("should return default value when call getStaticPaths", async () => {
    const response = await getStaticPaths({});

    expect(response).toEqual(
      expect.objectContaining({
        paths: [],
        fallback: "blocking",
      }),
    );
  });
});
