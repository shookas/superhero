import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CreateHeroModal from "./CreateHeroModal";

describe("CreateHeroModal", () => {
  it("renders the form correctly", () => {
    render(<CreateHeroModal onHeroCreated={vi.fn()} />);
    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Powers:/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Power/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  it("enables the submit button when the form is valid", () => {
    render(<CreateHeroModal onHeroCreated={vi.fn()} />);
    const nameInput = screen.getByLabelText(/Name:/i);
    const powerInput = screen.getAllByLabelText(/Powers:/i)[0];
    const submitButton = screen.getByText(/Submit/i);

    fireEvent.change(nameInput, { target: { value: "Superman" } });
    fireEvent.change(powerInput, { target: { value: "Flying" } });

    expect(submitButton).not.toBeDisabled();
  });

  it("disables the submit button when the form is invalid", () => {
    render(<CreateHeroModal onHeroCreated={vi.fn()} />);
    const nameInput = screen.getByLabelText(/Name:/i);
    const powerInput = screen.getAllByLabelText(/Powers:/i)[0];
    const submitButton = screen.getByText(/Submit/i);

    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.change(powerInput, { target: { value: "" } });

    expect(submitButton).toBeDisabled();
  });
});
