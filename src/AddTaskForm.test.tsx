import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddTaskForm } from "./AddTaskForm";

describe("AddTaskForm", () => {
  test("Adds a new todo", async () => {
    const onAdded = vi.fn();
    render(<AddTaskForm onAdded={onAdded} />);

    const input = await screen.findByRole<HTMLInputElement>("textbox");
    await userEvent.type(input, "New todo");
    await userEvent.keyboard("{Enter}");

    expect(onAdded).toHaveBeenCalledOnce();
    expect(onAdded).toHaveBeenCalledWith("New todo");

    // After submission, input is reset
    expect(input.value).toEqual("");
  });
});
