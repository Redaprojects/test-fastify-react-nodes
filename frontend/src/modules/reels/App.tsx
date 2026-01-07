// for testing purposes but doesn't work
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../../App";  // correct relative path

describe("App", () => {
  it("renders a greeting", () => {
    render(<App />);
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
    // expect(screen.getByText(/Instagram/i)).toBeInTheDocument();
  });
});