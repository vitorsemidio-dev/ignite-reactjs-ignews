import { fireEvent, render, screen } from "@testing-library/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { SignInButton } from ".";
import { mocked } from "jest-mock";

jest.mock("next-auth/react");

describe("SignInButton component", () => {
  it("renders correctly when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<SignInButton />);

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    const useSessionMocked = mocked(useSession);

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

    render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("call signOut correctly when user is authenticated", () => {
    const SignOutMocked = mocked(signOut);
    const useSessionMocked = mocked(useSession);

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

    render(<SignInButton />);

    const signOutButton = screen.getByText("John Doe");

    fireEvent.click(signOutButton);

    expect(SignOutMocked).toHaveBeenCalledTimes(1);
  });

  it("call signIn correctly when user is not authenticated", () => {
    const signInMocked = mocked(signIn);
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<SignInButton />);

    const signInButton = screen.getByText("Sign in with Github");

    fireEvent.click(signInButton);

    expect(signInMocked).toHaveBeenCalledTimes(1);
  });
});
