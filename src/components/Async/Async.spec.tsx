import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Async } from ".";

describe("Async component", () => {
  it("renders correctly", async () => {
    render(<Async />);

    expect(screen.getByText("Hello world")).toBeInTheDocument();
    await waitFor(() => {
      return expect(screen.getByText("Button")).toBeInTheDocument();
    });
  });

  it("renders correctly with (await + findByText)", async () => {
    render(<Async />);

    expect(screen.getByText("Hello world")).toBeInTheDocument();
    expect(await screen.findByText("Button")).toBeInTheDocument();
  });

  it("renders correctly with (waitFor)", async () => {
    render(<Async />);

    expect(screen.getByText("Hello world")).toBeInTheDocument();
    await waitFor(() => {
      return expect(screen.getByText("Button")).toBeInTheDocument();
    });
  });

  it("renders correctly with (waitForElementToBeRemoved)", async () => {
    render(<Async />);

    expect(screen.getByText("Hello world")).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.queryByText("Hide"));
  });
});
