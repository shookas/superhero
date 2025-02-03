import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Modal from "./Modal";

describe("Modal", () => {
  const onCloseMock = vi.fn();

  it("renders the modal with the correct title and children", () => {
    render(
      <Modal open={true} title="Test Modal" onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    render(
      <Modal open={true} title="Test Modal" onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>
    );

    const closeButton = screen.getByLabelText("Close");
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
