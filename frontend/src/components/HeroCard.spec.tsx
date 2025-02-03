import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SuperheroModel } from "../../../types/api";
import HeroCard from "./HeroCard";

describe("HeroCard", () => {
  const mockHero: SuperheroModel = {
    name: "Superman",
    powers: ["Flying", "Super Strength"],
  };

  it("renders the hero name and powers", () => {
    render(<HeroCard {...mockHero} onDelete={vi.fn()} />);
    expect(screen.getByText("Superman")).toBeInTheDocument();
    expect(screen.getByText("Flying")).toBeInTheDocument();
    expect(screen.getByText("Super Strength")).toBeInTheDocument();
  });

  it("calls onDelete with the correct name when delete button is clicked", () => {
    const onDelete = vi.fn();
    render(<HeroCard {...mockHero} onDelete={onDelete} />);
    const deleteButton = screen.getByLabelText("Delete");
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledWith("Superman");
  });

  it("renders the delete button", () => {
    render(<HeroCard {...mockHero} onDelete={vi.fn()} />);
    const deleteButton = screen.getByLabelText("Delete");
    expect(deleteButton).toBeInTheDocument();
  });
});
