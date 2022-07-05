import { render, screen, fireEvent } from "@testing-library/react";
import { SubscribeButton } from ".";
import { signIn, useSession } from "next-auth/react";
import { mocked } from "jest-mock";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";

jest.mock("next/router");
jest.mock("next-auth/react");
jest.mock("../../services/api");
jest.mock("../../services/stripe-js");

describe("SubscribeButton component", () => {
  it("renders correctly", () => {
    const useSessionMock = mocked(useSession);
    useSessionMock.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("redirects user to sign in when not authenticated", () => {
    const signInMocked = mocked(signIn);
    const useSessionMock = mocked(useSession);
    useSessionMock.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalledTimes(1);
  });

  it("redirects to posts when user already has a subscription", () => {
    const useRouterMoked = mocked(useRouter);
    const useSessionMocked = mocked(useSession);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
          email: "johndoe@email.com",
          image: "http://image.com",
        },
        userActiveSubscription: "fake-active-subscription",
        expires: "fake-expires",
      },
      status: "authenticated",
    });

    useRouterMoked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith("/posts");
  });

  it("create subscription if user authenticated without active subscription", () => {
    const apiPostMocked = mocked(api.post);
    const getStripeJsMocked = mocked(getStripeJs);
    const useSessionMocked = mocked(useSession);
    const redirectToCheckoutMocked = jest.fn();

    apiPostMocked.mockResolvedValue({
      data: {
        sessionId: "any-session-id",
      },
    });

    getStripeJsMocked.mockResolvedValueOnce({
      redirectToCheckout: redirectToCheckoutMocked.mockResolvedValueOnce({}),
    } as any);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
          email: "johndoe@email.com",
          image: "http://image.com",
        },
        expires: "fake-expires",
      },
      status: "authenticated",
    });

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(apiPostMocked).toHaveBeenCalledTimes(1);
  });

  it("throw error create subscription if user authenticated without active subscription", () => {
    const apiPostMocked = mocked(api.post);
    const getStripeJsMocked = mocked(getStripeJs);
    const useSessionMocked = mocked(useSession);
    const redirectToCheckoutMocked = jest.fn();

    apiPostMocked.mockRejectedValue(null);

    getStripeJsMocked.mockResolvedValueOnce({
      redirectToCheckout: redirectToCheckoutMocked.mockResolvedValueOnce({}),
    } as any);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
          email: "johndoe@email.com",
          image: "http://image.com",
        },
        expires: "fake-expires",
      },
      status: "authenticated",
    });

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(apiPostMocked).rejects;
  });
});
